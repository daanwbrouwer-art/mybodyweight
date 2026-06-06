import { useOnboarding } from "@/hooks/use-onboarding";
import { useWorkoutStore } from "@/store/workout";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import AchievementsPage from "./pages/AchievementsPage";

const SplashPage = lazy(() => import("@/pages/SplashPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const DecksPage = lazy(() => import("@/pages/DecksPage"));
const WorkoutSetupPage = lazy(() => import("@/pages/WorkoutSetupPage"));
const WorkoutSessionPage = lazy(() => import("@/pages/WorkoutSessionPage"));
const WorkoutSummaryPage = lazy(() => import("@/pages/WorkoutSummaryPage"));
const WelcomePage = lazy(() => import("@/pages/onboarding/WelcomePage"));
const AuthPage = lazy(() => import("@/pages/onboarding/AuthPage"));
const CreateAccountPage = lazy(
  () => import("@/pages/onboarding/CreateAccountPage"),
);
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const WelcomeTipsPage = lazy(
  () => import("@/pages/onboarding/WelcomeTipsPage"),
);
const VerifyEmailPage = lazy(
  () => import("@/pages/onboarding/VerifyEmailPage"),
);
const ForgotPasswordPage = lazy(
  () => import("@/pages/onboarding/ForgotPasswordPage"),
);
const ResetPasswordPage = lazy(
  () => import("@/pages/onboarding/ResetPasswordPage"),
);
const OnboardingFlowPage = lazy(() => import("@/pages/OnboardingPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));

const rootRoute = createRootRoute({
  component: () => (
    <div className="dark min-h-dvh bg-background">
      <Suspense
        fallback={
          <div className="min-h-dvh flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  ),
});

const splashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: SplashPage,
});

// AuthGuard intentionally kept for potential direct-auth-only routes
function _AuthGuard({ children }: { children: React.ReactNode }) {
  const { loginStatus } = useInternetIdentity();
  const guestMode = useWorkoutStore((s) => s.guestMode);
  const isEmailAuth = localStorage.getItem("mbw_user") !== null;
  const isAuthenticated = loginStatus === "success" || guestMode || isEmailAuth;
  if (!isAuthenticated) {
    throw redirect({ to: "/onboarding/welcome" });
  }
  return <>{children}</>;
}

function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { loginStatus } = useInternetIdentity();
  const guestMode = useWorkoutStore((s) => s.guestMode);
  const isEmailAuth = localStorage.getItem("mbw_user") !== null;
  const isAuthenticated = loginStatus === "success" || guestMode || isEmailAuth;
  const { hasCompletedOnboarding, isLoading } = useOnboarding();
  if (!isAuthenticated) {
    throw redirect({ to: "/onboarding/welcome" });
  }
  if (guestMode) return <>{children}</>;
  if (!isLoading && !hasCompletedOnboarding) {
    throw redirect({ to: "/onboarding/flow" });
  }
  return <>{children}</>;
}

function AdminGuard({ children }: { children: React.ReactNode }) {
  const isAdmin = localStorage.getItem("mbw_admin") === "true";
  if (!isAdmin) {
    throw redirect({ to: "/home" });
  }
  return <>{children}</>;
}

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: () => (
    <OnboardingGuard>
      <HomePage />
    </OnboardingGuard>
  ),
});

const decksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/decks",
  component: () => (
    <OnboardingGuard>
      <DecksPage />
    </OnboardingGuard>
  ),
});

const workoutSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/workout/setup",
  component: () => (
    <OnboardingGuard>
      <WorkoutSetupPage />
    </OnboardingGuard>
  ),
});

const workoutSessionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/workout/session",
  component: () => (
    <OnboardingGuard>
      <WorkoutSessionPage />
    </OnboardingGuard>
  ),
});

const workoutSummaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/workout/summary",
  component: () => (
    <OnboardingGuard>
      <WorkoutSummaryPage />
    </OnboardingGuard>
  ),
});

const onboardingWelcomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding/welcome",
  component: WelcomePage,
});

const onboardingAuthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding/auth",
  component: AuthPage,
});

const onboardingCreateAccountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding/create-account",
  component: CreateAccountPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <OnboardingGuard>
      <ProfilePage />
    </OnboardingGuard>
  ),
});

const onboardingFlowRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding/flow",
  component: OnboardingFlowPage,
});

const achievementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/achievements",
  component: () => (
    <OnboardingGuard>
      <AchievementsPage />
    </OnboardingGuard>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <AdminGuard>
      <AdminPage />
    </AdminGuard>
  ),
});

const welcomeTipsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/welcome-tips",
  component: WelcomeTipsPage,
});

const verifyEmailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verify-email",
  component: VerifyEmailPage,
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: ForgotPasswordPage,
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reset-password",
  component: ResetPasswordPage,
});

const routeTree = rootRoute.addChildren([
  splashRoute,
  homeRoute,
  decksRoute,
  workoutSetupRoute,
  workoutSessionRoute,
  workoutSummaryRoute,
  onboardingWelcomeRoute,
  onboardingAuthRoute,
  onboardingCreateAccountRoute,
  profileRoute,
  welcomeTipsRoute,
  verifyEmailRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
  onboardingFlowRoute,
  achievementsRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
