import { c as createLucideIcon, r as reactExports } from "./index-DqGOMkPn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
const CARD_COUNT_LABEL = {
  Ten: "10 Cards",
  Twenty: "20 Cards",
  FullDeck: "52 Cards — Full Challenge"
};
const JOKER_CHALLENGE_LABEL = {
  DeadHang30: "Dead Hang for 30 seconds"
};
const JOKER_CHALLENGE_EMOJI = {
  DeadHang30: "🙌"
};
function useTimer(running) {
  const [elapsed, setElapsed] = reactExports.useState(0);
  const intervalRef = reactExports.useRef(null);
  const reset = reactExports.useCallback(() => {
    setElapsed(0);
  }, []);
  reactExports.useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((s) => s + 1);
      }, 1e3);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);
  const formatted = formatTime(elapsed);
  return { elapsed, formatted, reset };
}
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
export {
  CARD_COUNT_LABEL as C,
  JOKER_CHALLENGE_EMOJI as J,
  CircleCheck as a,
  JOKER_CHALLENGE_LABEL as b,
  formatTime as f,
  useTimer as u
};
