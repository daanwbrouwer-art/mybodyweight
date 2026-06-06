import { C as ProtocolError, D as TimeoutWaitingForResponseErrorCode, E as utf8ToBytes, F as ExternalError, G as MissingRootKeyErrorCode, H as Certificate, I as lookupResultToBuffer, J as RequestStatusResponseStatus, U as UnknownError, K as RequestStatusDoneNoReplyErrorCode, N as RejectError, O as CertifiedRejectErrorCode, Q as UNREACHABLE_ERROR, V as InputError, W as InvalidReadStateRequestErrorCode, X as ReadRequestType, P as Principal, Y as IDL, Z as MissingCanisterIdErrorCode, _ as HttpAgent, $ as encode, a0 as QueryResponseStatus, a1 as UncertifiedRejectErrorCode, a2 as isV3ResponseBody, a3 as isV2ResponseBody, a4 as UncertifiedRejectUpdateErrorCode, a5 as UnexpectedErrorCode, a6 as decode, a7 as Variant, a8 as Record, a9 as Opt, aa as Vec, ab as Nat, ac as Tuple, ad as Service, ae as Func, af as Text, ag as Principal$1, ah as Bool, ai as Null, aj as Int } from "./index-DqGOMkPn.js";
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request = await ((_a = agent.createReadStateRequest) == null ? void 0 : _a.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
  }
  return request;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a, _b;
      options = {
        ...options,
        ...(_b = (_a = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b.call(_a, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a, _b;
      options = {
        ...options,
        ...(_b = (_a = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b.call(_a, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal.from(effectiveCanisterId) : cid;
      const arg = encode(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
const DeckId = Nat;
const Suit = Variant({
  "Diamonds": Null,
  "Hearts": Null,
  "Clubs": Null,
  "Joker": Null,
  "Spades": Null
});
const Rank = Variant({
  "Ace": Null,
  "Six": Null,
  "Ten": Null,
  "Two": Null,
  "Eight": Null,
  "Seven": Null,
  "Five": Null,
  "Four": Null,
  "Jack": Null,
  "King": Null,
  "Nine": Null,
  "Three": Null,
  "Joker": Null,
  "Queen": Null
});
const RepSpec = Variant({
  "Half": Null,
  "JokerChallenge": Null,
  "Double": Null,
  "Fixed": Nat
});
const CardId = Nat;
const Result = Variant({ "ok": Null, "err": Text });
const SessionId = Nat;
const Timestamp = Int;
const WorkoutSummary = Record({
  "startTime": Timestamp,
  "totalCards": Nat,
  "completedCards": Nat,
  "durationSeconds": Nat,
  "sessionId": SessionId,
  "estimatedCalories": Nat
});
const CardCount$1 = Variant({
  "Ten": Null,
  "FullDeck": Null,
  "Twenty": Null
});
const AchievementId = Text;
const AchievementRarity = Variant({
  "Epic": Null,
  "Rare": Null,
  "Uncommon": Null,
  "Legendary": Null,
  "Common": Null
});
const Achievement = Record({
  "id": AchievementId,
  "unlockedAt": Opt(Int),
  "name": Text,
  "description": Text,
  "rarity": AchievementRarity
});
const UserTier$1 = Variant({
  "Guest": Null,
  "Subscriber": Null,
  "Registered": Null
});
const AdminUserEntry = Record({
  "principal": Principal$1,
  "tier": UserTier$1,
  "email": Opt(Text),
  "isIndefinite": Bool,
  "tierExpiresAt": Opt(Int)
});
const Result_1 = Variant({
  "ok": Vec(AdminUserEntry),
  "err": Text
});
const Card = Record({
  "id": CardId,
  "rank": Rank,
  "suit": Suit,
  "exercise": Text,
  "deckId": DeckId,
  "imageUrl": Text,
  "repSpec": RepSpec,
  "videoUrl": Text
});
const Deck = Record({
  "id": DeckId,
  "name": Text,
  "isAvailable": Bool,
  "description": Text,
  "cardCount": Nat
});
const DeckWithCards = Record({
  "cards": Vec(Card),
  "deck": Deck
});
const UserProfile = Record({
  "principal": Principal$1,
  "aceCardsDrawn": Nat,
  "emailVerified": Bool,
  "username": Text,
  "unlockedAchievements": Vec(Tuple(Text, Int)),
  "createdAt": Int,
  "totalWorkouts": Nat,
  "totalReps": Nat,
  "email": Text,
  "totalCalories": Nat,
  "kingCardsDrawn": Nat,
  "lastWorkoutDate": Opt(Int),
  "totalRepsPerSuit": Record({
    "diamonds": Nat,
    "clubs": Nat,
    "spades": Nat,
    "hearts": Nat
  }),
  "longestStreak": Nat,
  "fullDecksCompleted": Nat,
  "currentStreak": Nat,
  "jokerCardsDrawn": Nat
});
const WorkoutHistoryEntry = Record({
  "id": Text,
  "completedAt": Int,
  "aceCardsDrawn": Nat,
  "userId": Principal$1,
  "deckId": Text,
  "totalReps": Nat,
  "kingCardsDrawn": Nat,
  "durationSeconds": Nat,
  "cardsCompleted": Nat,
  "caloriesBurned": Nat,
  "repsBySuit": Record({
    "diamonds": Nat,
    "clubs": Nat,
    "spades": Nat,
    "hearts": Nat
  }),
  "jokerCardsDrawn": Nat
});
const OnboardingData = Record({
  "level": Text,
  "gender": Text,
  "hasCompletedOnboarding": Bool
});
const SessionStatus = Variant({
  "Active": Null,
  "Completed": Null
});
const WorkoutSessionView = Record({
  "id": SessionId,
  "currentIndex": Nat,
  "startTime": Timestamp,
  "status": SessionStatus,
  "totalCards": Nat,
  "deckId": DeckId,
  "cardCount": Nat,
  "elapsedSeconds": Nat,
  "remainingCards": Nat,
  "estimatedCalories": Nat
});
const JokerChallenge$1 = Variant({ "DeadHang30": Null });
const SessionCard = Record({
  "challenge": Opt(JokerChallenge$1),
  "card": Card,
  "reps": Nat,
  "isMod": Bool
});
Service({
  "addCard": Func(
    [DeckId, Suit, Rank, Text, RepSpec, Text, Text],
    [CardId],
    []
  ),
  "addDeck": Func([Text, Text, Bool], [DeckId], []),
  "adminGrantSubscriber": Func(
    [Principal$1, Opt(Int), Bool],
    [Result],
    []
  ),
  "adminRevokeSubscriber": Func([Principal$1], [Result], []),
  "completeWorkout": Func([SessionId], [Opt(WorkoutSummary)], []),
  "createWorkoutSession": Func([DeckId, CardCount$1], [SessionId], []),
  "deleteDeck": Func([DeckId], [], []),
  "getAchievements": Func([], [Vec(Achievement)], ["query"]),
  "getAdminUserList": Func([], [Result_1], []),
  "getDeck": Func([DeckId], [Opt(DeckWithCards)], ["query"]),
  "getDecks": Func([], [Vec(Deck)], ["query"]),
  "getMyProfile": Func(
    [],
    [Variant({ "ok": UserProfile, "err": Text })],
    ["query"]
  ),
  "getMyWorkoutHistory": Func(
    [],
    [Variant({ "ok": Vec(WorkoutHistoryEntry), "err": Text })],
    ["query"]
  ),
  "getOnboarding": Func([], [Opt(OnboardingData)], ["query"]),
  "getTier": Func([Principal$1], [UserTier$1], ["query"]),
  "getUserAchievements": Func(
    [],
    [Vec(Tuple(Text, Int))],
    ["query"]
  ),
  "getWorkoutSession": Func(
    [SessionId],
    [Opt(WorkoutSessionView)],
    ["query"]
  ),
  "loginUser": Func(
    [Text, Text],
    [Variant({ "ok": UserProfile, "err": Text })],
    []
  ),
  "nextCard": Func([SessionId], [Opt(SessionCard)], []),
  "registerUser": Func(
    [Text, Text, Text],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "requestPasswordReset": Func(
    [Text],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "resendVerificationEmail": Func(
    [Text],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "resetPassword": Func(
    [Text, Text],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "revokeTier": Func([Principal$1], [Result], []),
  "saveOnboarding": Func([Text, Text], [Result], []),
  "saveWorkoutHistory": Func(
    [WorkoutHistoryEntry],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "setAdminPrincipal": Func([Principal$1], [Result], []),
  "setTier": Func(
    [Principal$1, UserTier$1, Opt(Int), Bool],
    [Result],
    []
  ),
  "updateCard": Func(
    [CardId, Text, RepSpec, Text, Text],
    [],
    []
  ),
  "updateProfile": Func(
    [Text],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "verifyEmail": Func(
    [Text],
    [Variant({ "ok": Null, "err": Text })],
    []
  )
});
const idlFactory = ({ IDL: IDL2 }) => {
  const DeckId2 = IDL2.Nat;
  const Suit2 = IDL2.Variant({
    "Diamonds": IDL2.Null,
    "Hearts": IDL2.Null,
    "Clubs": IDL2.Null,
    "Joker": IDL2.Null,
    "Spades": IDL2.Null
  });
  const Rank2 = IDL2.Variant({
    "Ace": IDL2.Null,
    "Six": IDL2.Null,
    "Ten": IDL2.Null,
    "Two": IDL2.Null,
    "Eight": IDL2.Null,
    "Seven": IDL2.Null,
    "Five": IDL2.Null,
    "Four": IDL2.Null,
    "Jack": IDL2.Null,
    "King": IDL2.Null,
    "Nine": IDL2.Null,
    "Three": IDL2.Null,
    "Joker": IDL2.Null,
    "Queen": IDL2.Null
  });
  const RepSpec2 = IDL2.Variant({
    "Half": IDL2.Null,
    "JokerChallenge": IDL2.Null,
    "Double": IDL2.Null,
    "Fixed": IDL2.Nat
  });
  const CardId2 = IDL2.Nat;
  const Result2 = IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text });
  const SessionId2 = IDL2.Nat;
  const Timestamp2 = IDL2.Int;
  const WorkoutSummary2 = IDL2.Record({
    "startTime": Timestamp2,
    "totalCards": IDL2.Nat,
    "completedCards": IDL2.Nat,
    "durationSeconds": IDL2.Nat,
    "sessionId": SessionId2,
    "estimatedCalories": IDL2.Nat
  });
  const CardCount2 = IDL2.Variant({
    "Ten": IDL2.Null,
    "FullDeck": IDL2.Null,
    "Twenty": IDL2.Null
  });
  const AchievementId2 = IDL2.Text;
  const AchievementRarity2 = IDL2.Variant({
    "Epic": IDL2.Null,
    "Rare": IDL2.Null,
    "Uncommon": IDL2.Null,
    "Legendary": IDL2.Null,
    "Common": IDL2.Null
  });
  const Achievement2 = IDL2.Record({
    "id": AchievementId2,
    "unlockedAt": IDL2.Opt(IDL2.Int),
    "name": IDL2.Text,
    "description": IDL2.Text,
    "rarity": AchievementRarity2
  });
  const UserTier2 = IDL2.Variant({
    "Guest": IDL2.Null,
    "Subscriber": IDL2.Null,
    "Registered": IDL2.Null
  });
  const AdminUserEntry2 = IDL2.Record({
    "principal": IDL2.Principal,
    "tier": UserTier2,
    "email": IDL2.Opt(IDL2.Text),
    "isIndefinite": IDL2.Bool,
    "tierExpiresAt": IDL2.Opt(IDL2.Int)
  });
  const Result_12 = IDL2.Variant({
    "ok": IDL2.Vec(AdminUserEntry2),
    "err": IDL2.Text
  });
  const Card2 = IDL2.Record({
    "id": CardId2,
    "rank": Rank2,
    "suit": Suit2,
    "exercise": IDL2.Text,
    "deckId": DeckId2,
    "imageUrl": IDL2.Text,
    "repSpec": RepSpec2,
    "videoUrl": IDL2.Text
  });
  const Deck2 = IDL2.Record({
    "id": DeckId2,
    "name": IDL2.Text,
    "isAvailable": IDL2.Bool,
    "description": IDL2.Text,
    "cardCount": IDL2.Nat
  });
  const DeckWithCards2 = IDL2.Record({ "cards": IDL2.Vec(Card2), "deck": Deck2 });
  const UserProfile2 = IDL2.Record({
    "principal": IDL2.Principal,
    "aceCardsDrawn": IDL2.Nat,
    "emailVerified": IDL2.Bool,
    "username": IDL2.Text,
    "unlockedAchievements": IDL2.Vec(IDL2.Tuple(IDL2.Text, IDL2.Int)),
    "createdAt": IDL2.Int,
    "totalWorkouts": IDL2.Nat,
    "totalReps": IDL2.Nat,
    "email": IDL2.Text,
    "totalCalories": IDL2.Nat,
    "kingCardsDrawn": IDL2.Nat,
    "lastWorkoutDate": IDL2.Opt(IDL2.Int),
    "totalRepsPerSuit": IDL2.Record({
      "diamonds": IDL2.Nat,
      "clubs": IDL2.Nat,
      "spades": IDL2.Nat,
      "hearts": IDL2.Nat
    }),
    "longestStreak": IDL2.Nat,
    "fullDecksCompleted": IDL2.Nat,
    "currentStreak": IDL2.Nat,
    "jokerCardsDrawn": IDL2.Nat
  });
  const WorkoutHistoryEntry2 = IDL2.Record({
    "id": IDL2.Text,
    "completedAt": IDL2.Int,
    "aceCardsDrawn": IDL2.Nat,
    "userId": IDL2.Principal,
    "deckId": IDL2.Text,
    "totalReps": IDL2.Nat,
    "kingCardsDrawn": IDL2.Nat,
    "durationSeconds": IDL2.Nat,
    "cardsCompleted": IDL2.Nat,
    "caloriesBurned": IDL2.Nat,
    "repsBySuit": IDL2.Record({
      "diamonds": IDL2.Nat,
      "clubs": IDL2.Nat,
      "spades": IDL2.Nat,
      "hearts": IDL2.Nat
    }),
    "jokerCardsDrawn": IDL2.Nat
  });
  const OnboardingData2 = IDL2.Record({
    "level": IDL2.Text,
    "gender": IDL2.Text,
    "hasCompletedOnboarding": IDL2.Bool
  });
  const SessionStatus2 = IDL2.Variant({
    "Active": IDL2.Null,
    "Completed": IDL2.Null
  });
  const WorkoutSessionView2 = IDL2.Record({
    "id": SessionId2,
    "currentIndex": IDL2.Nat,
    "startTime": Timestamp2,
    "status": SessionStatus2,
    "totalCards": IDL2.Nat,
    "deckId": DeckId2,
    "cardCount": IDL2.Nat,
    "elapsedSeconds": IDL2.Nat,
    "remainingCards": IDL2.Nat,
    "estimatedCalories": IDL2.Nat
  });
  const JokerChallenge2 = IDL2.Variant({ "DeadHang30": IDL2.Null });
  const SessionCard2 = IDL2.Record({
    "challenge": IDL2.Opt(JokerChallenge2),
    "card": Card2,
    "reps": IDL2.Nat,
    "isMod": IDL2.Bool
  });
  return IDL2.Service({
    "addCard": IDL2.Func(
      [DeckId2, Suit2, Rank2, IDL2.Text, RepSpec2, IDL2.Text, IDL2.Text],
      [CardId2],
      []
    ),
    "addDeck": IDL2.Func([IDL2.Text, IDL2.Text, IDL2.Bool], [DeckId2], []),
    "adminGrantSubscriber": IDL2.Func(
      [IDL2.Principal, IDL2.Opt(IDL2.Int), IDL2.Bool],
      [Result2],
      []
    ),
    "adminRevokeSubscriber": IDL2.Func([IDL2.Principal], [Result2], []),
    "completeWorkout": IDL2.Func([SessionId2], [IDL2.Opt(WorkoutSummary2)], []),
    "createWorkoutSession": IDL2.Func([DeckId2, CardCount2], [SessionId2], []),
    "deleteDeck": IDL2.Func([DeckId2], [], []),
    "getAchievements": IDL2.Func([], [IDL2.Vec(Achievement2)], ["query"]),
    "getAdminUserList": IDL2.Func([], [Result_12], []),
    "getDeck": IDL2.Func([DeckId2], [IDL2.Opt(DeckWithCards2)], ["query"]),
    "getDecks": IDL2.Func([], [IDL2.Vec(Deck2)], ["query"]),
    "getMyProfile": IDL2.Func(
      [],
      [IDL2.Variant({ "ok": UserProfile2, "err": IDL2.Text })],
      ["query"]
    ),
    "getMyWorkoutHistory": IDL2.Func(
      [],
      [
        IDL2.Variant({
          "ok": IDL2.Vec(WorkoutHistoryEntry2),
          "err": IDL2.Text
        })
      ],
      ["query"]
    ),
    "getOnboarding": IDL2.Func([], [IDL2.Opt(OnboardingData2)], ["query"]),
    "getTier": IDL2.Func([IDL2.Principal], [UserTier2], ["query"]),
    "getUserAchievements": IDL2.Func(
      [],
      [IDL2.Vec(IDL2.Tuple(IDL2.Text, IDL2.Int))],
      ["query"]
    ),
    "getWorkoutSession": IDL2.Func(
      [SessionId2],
      [IDL2.Opt(WorkoutSessionView2)],
      ["query"]
    ),
    "loginUser": IDL2.Func(
      [IDL2.Text, IDL2.Text],
      [IDL2.Variant({ "ok": UserProfile2, "err": IDL2.Text })],
      []
    ),
    "nextCard": IDL2.Func([SessionId2], [IDL2.Opt(SessionCard2)], []),
    "registerUser": IDL2.Func(
      [IDL2.Text, IDL2.Text, IDL2.Text],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "requestPasswordReset": IDL2.Func(
      [IDL2.Text],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "resendVerificationEmail": IDL2.Func(
      [IDL2.Text],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "resetPassword": IDL2.Func(
      [IDL2.Text, IDL2.Text],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "revokeTier": IDL2.Func([IDL2.Principal], [Result2], []),
    "saveOnboarding": IDL2.Func([IDL2.Text, IDL2.Text], [Result2], []),
    "saveWorkoutHistory": IDL2.Func(
      [WorkoutHistoryEntry2],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "setAdminPrincipal": IDL2.Func([IDL2.Principal], [Result2], []),
    "setTier": IDL2.Func(
      [IDL2.Principal, UserTier2, IDL2.Opt(IDL2.Int), IDL2.Bool],
      [Result2],
      []
    ),
    "updateCard": IDL2.Func(
      [CardId2, IDL2.Text, RepSpec2, IDL2.Text, IDL2.Text],
      [],
      []
    ),
    "updateProfile": IDL2.Func(
      [IDL2.Text],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "verifyEmail": IDL2.Func(
      [IDL2.Text],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    )
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
var CardCount = /* @__PURE__ */ ((CardCount2) => {
  CardCount2["Ten"] = "Ten";
  CardCount2["FullDeck"] = "FullDeck";
  CardCount2["Twenty"] = "Twenty";
  return CardCount2;
})(CardCount || {});
var JokerChallenge = /* @__PURE__ */ ((JokerChallenge2) => {
  JokerChallenge2["DeadHang30"] = "DeadHang30";
  return JokerChallenge2;
})(JokerChallenge || {});
var UserTier = /* @__PURE__ */ ((UserTier2) => {
  UserTier2["Guest"] = "Guest";
  UserTier2["Subscriber"] = "Subscriber";
  UserTier2["Registered"] = "Registered";
  return UserTier2;
})(UserTier || {});
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async addCard(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    if (this.processError) {
      try {
        const result = await this.actor.addCard(arg0, to_candid_Suit_n1(this._uploadFile, this._downloadFile, arg1), to_candid_Rank_n3(this._uploadFile, this._downloadFile, arg2), arg3, to_candid_RepSpec_n5(this._uploadFile, this._downloadFile, arg4), arg5, arg6);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addCard(arg0, to_candid_Suit_n1(this._uploadFile, this._downloadFile, arg1), to_candid_Rank_n3(this._uploadFile, this._downloadFile, arg2), arg3, to_candid_RepSpec_n5(this._uploadFile, this._downloadFile, arg4), arg5, arg6);
      return result;
    }
  }
  async addDeck(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.addDeck(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addDeck(arg0, arg1, arg2);
      return result;
    }
  }
  async adminGrantSubscriber(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.adminGrantSubscriber(arg0, to_candid_opt_n7(this._uploadFile, this._downloadFile, arg1), arg2);
        return from_candid_Result_n8(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminGrantSubscriber(arg0, to_candid_opt_n7(this._uploadFile, this._downloadFile, arg1), arg2);
      return from_candid_Result_n8(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminRevokeSubscriber(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminRevokeSubscriber(arg0);
        return from_candid_Result_n8(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminRevokeSubscriber(arg0);
      return from_candid_Result_n8(this._uploadFile, this._downloadFile, result);
    }
  }
  async completeWorkout(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.completeWorkout(arg0);
        return from_candid_opt_n10(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.completeWorkout(arg0);
      return from_candid_opt_n10(this._uploadFile, this._downloadFile, result);
    }
  }
  async createWorkoutSession(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.createWorkoutSession(arg0, to_candid_CardCount_n11(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createWorkoutSession(arg0, to_candid_CardCount_n11(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async deleteDeck(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteDeck(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteDeck(arg0);
      return result;
    }
  }
  async getAchievements() {
    if (this.processError) {
      try {
        const result = await this.actor.getAchievements();
        return from_candid_vec_n13(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAchievements();
      return from_candid_vec_n13(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAdminUserList() {
    if (this.processError) {
      try {
        const result = await this.actor.getAdminUserList();
        return from_candid_Result_1_n19(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAdminUserList();
      return from_candid_Result_1_n19(this._uploadFile, this._downloadFile, result);
    }
  }
  async getDeck(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getDeck(arg0);
        return from_candid_opt_n27(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getDeck(arg0);
      return from_candid_opt_n27(this._uploadFile, this._downloadFile, result);
    }
  }
  async getDecks() {
    if (this.processError) {
      try {
        const result = await this.actor.getDecks();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getDecks();
      return result;
    }
  }
  async getMyProfile() {
    if (this.processError) {
      try {
        const result = await this.actor.getMyProfile();
        return from_candid_variant_n39(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMyProfile();
      return from_candid_variant_n39(this._uploadFile, this._downloadFile, result);
    }
  }
  async getMyWorkoutHistory() {
    if (this.processError) {
      try {
        const result = await this.actor.getMyWorkoutHistory();
        return from_candid_variant_n42(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMyWorkoutHistory();
      return from_candid_variant_n42(this._uploadFile, this._downloadFile, result);
    }
  }
  async getOnboarding() {
    if (this.processError) {
      try {
        const result = await this.actor.getOnboarding();
        return from_candid_opt_n43(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getOnboarding();
      return from_candid_opt_n43(this._uploadFile, this._downloadFile, result);
    }
  }
  async getTier(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getTier(arg0);
        return from_candid_UserTier_n24(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getTier(arg0);
      return from_candid_UserTier_n24(this._uploadFile, this._downloadFile, result);
    }
  }
  async getUserAchievements() {
    if (this.processError) {
      try {
        const result = await this.actor.getUserAchievements();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getUserAchievements();
      return result;
    }
  }
  async getWorkoutSession(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getWorkoutSession(arg0);
        return from_candid_opt_n44(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getWorkoutSession(arg0);
      return from_candid_opt_n44(this._uploadFile, this._downloadFile, result);
    }
  }
  async loginUser(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.loginUser(arg0, arg1);
        return from_candid_variant_n39(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.loginUser(arg0, arg1);
      return from_candid_variant_n39(this._uploadFile, this._downloadFile, result);
    }
  }
  async nextCard(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.nextCard(arg0);
        return from_candid_opt_n49(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.nextCard(arg0);
      return from_candid_opt_n49(this._uploadFile, this._downloadFile, result);
    }
  }
  async registerUser(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.registerUser(arg0, arg1, arg2);
        return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.registerUser(arg0, arg1, arg2);
      return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
    }
  }
  async requestPasswordReset(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.requestPasswordReset(arg0);
        return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.requestPasswordReset(arg0);
      return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
    }
  }
  async resendVerificationEmail(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.resendVerificationEmail(arg0);
        return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.resendVerificationEmail(arg0);
      return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
    }
  }
  async resetPassword(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.resetPassword(arg0, arg1);
        return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.resetPassword(arg0, arg1);
      return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
    }
  }
  async revokeTier(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.revokeTier(arg0);
        return from_candid_Result_n8(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.revokeTier(arg0);
      return from_candid_Result_n8(this._uploadFile, this._downloadFile, result);
    }
  }
  async saveOnboarding(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.saveOnboarding(arg0, arg1);
        return from_candid_Result_n8(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.saveOnboarding(arg0, arg1);
      return from_candid_Result_n8(this._uploadFile, this._downloadFile, result);
    }
  }
  async saveWorkoutHistory(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.saveWorkoutHistory(arg0);
        return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.saveWorkoutHistory(arg0);
      return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
    }
  }
  async setAdminPrincipal(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setAdminPrincipal(arg0);
        return from_candid_Result_n8(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setAdminPrincipal(arg0);
      return from_candid_Result_n8(this._uploadFile, this._downloadFile, result);
    }
  }
  async setTier(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.setTier(arg0, to_candid_UserTier_n55(this._uploadFile, this._downloadFile, arg1), to_candid_opt_n7(this._uploadFile, this._downloadFile, arg2), arg3);
        return from_candid_Result_n8(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setTier(arg0, to_candid_UserTier_n55(this._uploadFile, this._downloadFile, arg1), to_candid_opt_n7(this._uploadFile, this._downloadFile, arg2), arg3);
      return from_candid_Result_n8(this._uploadFile, this._downloadFile, result);
    }
  }
  async updateCard(arg0, arg1, arg2, arg3, arg4) {
    if (this.processError) {
      try {
        const result = await this.actor.updateCard(arg0, arg1, to_candid_RepSpec_n5(this._uploadFile, this._downloadFile, arg2), arg3, arg4);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateCard(arg0, arg1, to_candid_RepSpec_n5(this._uploadFile, this._downloadFile, arg2), arg3, arg4);
      return result;
    }
  }
  async updateProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.updateProfile(arg0);
        return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateProfile(arg0);
      return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
    }
  }
  async verifyEmail(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.verifyEmail(arg0);
        return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.verifyEmail(arg0);
      return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
    }
  }
}
function from_candid_AchievementRarity_n17(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n18(_uploadFile, _downloadFile, value);
}
function from_candid_Achievement_n14(_uploadFile, _downloadFile, value) {
  return from_candid_record_n15(_uploadFile, _downloadFile, value);
}
function from_candid_AdminUserEntry_n22(_uploadFile, _downloadFile, value) {
  return from_candid_record_n23(_uploadFile, _downloadFile, value);
}
function from_candid_Card_n31(_uploadFile, _downloadFile, value) {
  return from_candid_record_n32(_uploadFile, _downloadFile, value);
}
function from_candid_DeckWithCards_n28(_uploadFile, _downloadFile, value) {
  return from_candid_record_n29(_uploadFile, _downloadFile, value);
}
function from_candid_JokerChallenge_n53(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n54(_uploadFile, _downloadFile, value);
}
function from_candid_Rank_n33(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n34(_uploadFile, _downloadFile, value);
}
function from_candid_RepSpec_n37(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n38(_uploadFile, _downloadFile, value);
}
function from_candid_Result_1_n19(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n20(_uploadFile, _downloadFile, value);
}
function from_candid_Result_n8(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n9(_uploadFile, _downloadFile, value);
}
function from_candid_SessionCard_n50(_uploadFile, _downloadFile, value) {
  return from_candid_record_n51(_uploadFile, _downloadFile, value);
}
function from_candid_SessionStatus_n47(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n48(_uploadFile, _downloadFile, value);
}
function from_candid_Suit_n35(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n36(_uploadFile, _downloadFile, value);
}
function from_candid_UserProfile_n40(_uploadFile, _downloadFile, value) {
  return from_candid_record_n41(_uploadFile, _downloadFile, value);
}
function from_candid_UserTier_n24(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n25(_uploadFile, _downloadFile, value);
}
function from_candid_WorkoutSessionView_n45(_uploadFile, _downloadFile, value) {
  return from_candid_record_n46(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n10(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n16(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n26(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n27(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_DeckWithCards_n28(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n43(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n44(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_WorkoutSessionView_n45(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n49(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_SessionCard_n50(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n52(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_JokerChallenge_n53(_uploadFile, _downloadFile, value[0]);
}
function from_candid_record_n15(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    unlockedAt: record_opt_to_undefined(from_candid_opt_n16(_uploadFile, _downloadFile, value.unlockedAt)),
    name: value.name,
    description: value.description,
    rarity: from_candid_AchievementRarity_n17(_uploadFile, _downloadFile, value.rarity)
  };
}
function from_candid_record_n23(_uploadFile, _downloadFile, value) {
  return {
    principal: value.principal,
    tier: from_candid_UserTier_n24(_uploadFile, _downloadFile, value.tier),
    email: record_opt_to_undefined(from_candid_opt_n26(_uploadFile, _downloadFile, value.email)),
    isIndefinite: value.isIndefinite,
    tierExpiresAt: record_opt_to_undefined(from_candid_opt_n16(_uploadFile, _downloadFile, value.tierExpiresAt))
  };
}
function from_candid_record_n29(_uploadFile, _downloadFile, value) {
  return {
    cards: from_candid_vec_n30(_uploadFile, _downloadFile, value.cards),
    deck: value.deck
  };
}
function from_candid_record_n32(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    rank: from_candid_Rank_n33(_uploadFile, _downloadFile, value.rank),
    suit: from_candid_Suit_n35(_uploadFile, _downloadFile, value.suit),
    exercise: value.exercise,
    deckId: value.deckId,
    imageUrl: value.imageUrl,
    repSpec: from_candid_RepSpec_n37(_uploadFile, _downloadFile, value.repSpec),
    videoUrl: value.videoUrl
  };
}
function from_candid_record_n41(_uploadFile, _downloadFile, value) {
  return {
    principal: value.principal,
    aceCardsDrawn: value.aceCardsDrawn,
    emailVerified: value.emailVerified,
    username: value.username,
    unlockedAchievements: value.unlockedAchievements,
    createdAt: value.createdAt,
    totalWorkouts: value.totalWorkouts,
    totalReps: value.totalReps,
    email: value.email,
    totalCalories: value.totalCalories,
    kingCardsDrawn: value.kingCardsDrawn,
    lastWorkoutDate: record_opt_to_undefined(from_candid_opt_n16(_uploadFile, _downloadFile, value.lastWorkoutDate)),
    totalRepsPerSuit: value.totalRepsPerSuit,
    longestStreak: value.longestStreak,
    fullDecksCompleted: value.fullDecksCompleted,
    currentStreak: value.currentStreak,
    jokerCardsDrawn: value.jokerCardsDrawn
  };
}
function from_candid_record_n46(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    currentIndex: value.currentIndex,
    startTime: value.startTime,
    status: from_candid_SessionStatus_n47(_uploadFile, _downloadFile, value.status),
    totalCards: value.totalCards,
    deckId: value.deckId,
    cardCount: value.cardCount,
    elapsedSeconds: value.elapsedSeconds,
    remainingCards: value.remainingCards,
    estimatedCalories: value.estimatedCalories
  };
}
function from_candid_record_n51(_uploadFile, _downloadFile, value) {
  return {
    challenge: record_opt_to_undefined(from_candid_opt_n52(_uploadFile, _downloadFile, value.challenge)),
    card: from_candid_Card_n31(_uploadFile, _downloadFile, value.card),
    reps: value.reps,
    isMod: value.isMod
  };
}
function from_candid_variant_n18(_uploadFile, _downloadFile, value) {
  return "Epic" in value ? "Epic" : "Rare" in value ? "Rare" : "Uncommon" in value ? "Uncommon" : "Legendary" in value ? "Legendary" : "Common" in value ? "Common" : value;
}
function from_candid_variant_n20(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: from_candid_vec_n21(_uploadFile, _downloadFile, value.ok)
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n25(_uploadFile, _downloadFile, value) {
  return "Guest" in value ? "Guest" : "Subscriber" in value ? "Subscriber" : "Registered" in value ? "Registered" : value;
}
function from_candid_variant_n34(_uploadFile, _downloadFile, value) {
  return "Ace" in value ? "Ace" : "Six" in value ? "Six" : "Ten" in value ? "Ten" : "Two" in value ? "Two" : "Eight" in value ? "Eight" : "Seven" in value ? "Seven" : "Five" in value ? "Five" : "Four" in value ? "Four" : "Jack" in value ? "Jack" : "King" in value ? "King" : "Nine" in value ? "Nine" : "Three" in value ? "Three" : "Joker" in value ? "Joker" : "Queen" in value ? "Queen" : value;
}
function from_candid_variant_n36(_uploadFile, _downloadFile, value) {
  return "Diamonds" in value ? "Diamonds" : "Hearts" in value ? "Hearts" : "Clubs" in value ? "Clubs" : "Joker" in value ? "Joker" : "Spades" in value ? "Spades" : value;
}
function from_candid_variant_n38(_uploadFile, _downloadFile, value) {
  return "Half" in value ? {
    __kind__: "Half",
    Half: value.Half
  } : "JokerChallenge" in value ? {
    __kind__: "JokerChallenge",
    JokerChallenge: value.JokerChallenge
  } : "Double" in value ? {
    __kind__: "Double",
    Double: value.Double
  } : "Fixed" in value ? {
    __kind__: "Fixed",
    Fixed: value.Fixed
  } : value;
}
function from_candid_variant_n39(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: from_candid_UserProfile_n40(_uploadFile, _downloadFile, value.ok)
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n42(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n48(_uploadFile, _downloadFile, value) {
  return "Active" in value ? "Active" : "Completed" in value ? "Completed" : value;
}
function from_candid_variant_n54(_uploadFile, _downloadFile, value) {
  return "DeadHang30" in value ? "DeadHang30" : value;
}
function from_candid_variant_n9(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_vec_n13(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Achievement_n14(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n21(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_AdminUserEntry_n22(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n30(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Card_n31(_uploadFile, _downloadFile, x));
}
function to_candid_CardCount_n11(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n12(_uploadFile, _downloadFile, value);
}
function to_candid_Rank_n3(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n4(_uploadFile, _downloadFile, value);
}
function to_candid_RepSpec_n5(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n6(_uploadFile, _downloadFile, value);
}
function to_candid_Suit_n1(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n2(_uploadFile, _downloadFile, value);
}
function to_candid_UserTier_n55(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n56(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n7(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(value);
}
function to_candid_variant_n12(_uploadFile, _downloadFile, value) {
  return value == "Ten" ? {
    Ten: null
  } : value == "FullDeck" ? {
    FullDeck: null
  } : value == "Twenty" ? {
    Twenty: null
  } : value;
}
function to_candid_variant_n2(_uploadFile, _downloadFile, value) {
  return value == "Diamonds" ? {
    Diamonds: null
  } : value == "Hearts" ? {
    Hearts: null
  } : value == "Clubs" ? {
    Clubs: null
  } : value == "Joker" ? {
    Joker: null
  } : value == "Spades" ? {
    Spades: null
  } : value;
}
function to_candid_variant_n4(_uploadFile, _downloadFile, value) {
  return value == "Ace" ? {
    Ace: null
  } : value == "Six" ? {
    Six: null
  } : value == "Ten" ? {
    Ten: null
  } : value == "Two" ? {
    Two: null
  } : value == "Eight" ? {
    Eight: null
  } : value == "Seven" ? {
    Seven: null
  } : value == "Five" ? {
    Five: null
  } : value == "Four" ? {
    Four: null
  } : value == "Jack" ? {
    Jack: null
  } : value == "King" ? {
    King: null
  } : value == "Nine" ? {
    Nine: null
  } : value == "Three" ? {
    Three: null
  } : value == "Joker" ? {
    Joker: null
  } : value == "Queen" ? {
    Queen: null
  } : value;
}
function to_candid_variant_n56(_uploadFile, _downloadFile, value) {
  return value == "Guest" ? {
    Guest: null
  } : value == "Subscriber" ? {
    Subscriber: null
  } : value == "Registered" ? {
    Registered: null
  } : value;
}
function to_candid_variant_n6(_uploadFile, _downloadFile, value) {
  return value.__kind__ === "Half" ? {
    Half: value.Half
  } : value.__kind__ === "JokerChallenge" ? {
    JokerChallenge: value.JokerChallenge
  } : value.__kind__ === "Double" ? {
    Double: value.Double
  } : value.__kind__ === "Fixed" ? {
    Fixed: value.Fixed
  } : value;
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
export {
  CardCount as C,
  JokerChallenge as J,
  UserTier as U,
  createActor as c
};
