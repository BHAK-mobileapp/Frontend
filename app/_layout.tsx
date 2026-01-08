import * as Sentry from '@sentry/react-native';
import { Stack, useNavigationContainerRef } from 'expo-router';
import { useEffect } from 'react';

const navigationIntegration = Sentry.reactNavigationIntegration();

Sentry.init({
  dsn: 'https://3e0eae18f7b66a6ab49bc43025656457@o4510506283302912.ingest.us.sentry.io/4510511289139200',
  tracePropagationTargets: ["https://myproject.org", /^\/api\//],
  debug: true,// Bật để xem logs khi test
  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/

  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% transactions khi test
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 5000,

  profilesSampleRate: 1.0, // Capture 100% profiles khi test
  // User Interaction Tracking

  enableUserInteractionTracing: true,

  // Privacy
  sendDefaultPii: true, // Không gửi thông tin cá nhân mặc định
  maxBreadcrumbs: 150,

  // Enable native crash handling
  enableNative: true,
  enableNativeCrashHandling: true,
  enableAutoPerformanceTracing: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  integrations: [
    Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()], // Sentry.hermesProfilingIntegration({platformProfilers: false,})

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: _DEV_,
});

export default Sentry.wrap(function RootLayout() {
  const ref = useNavigationContainerRef();

  useEffect(() => {
      if (ref) {
        navigationIntegration.registerNavigationContainer(ref);
      }
    }, [ref]);
    // Thiết lập user context cho analytics
    useEffect(() => {
      Sentry.setUser({
        id: "bhak_test_2025",
        email: "huy.tranrosenberg@hcmut.edu.vn",
        username: "BHAK",
      });
      Sentry.setTag("group", "bhak");
    }, []);

    return (
      <Stack>
      </Stack>
    );
});