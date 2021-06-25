import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  // Sentry.init({
  //   dsn: "https://fdebd65e9a364097add5aca5e164cad9@o853812.ingest.sentry.io/5819087",
  //   integrations: [new Integrations.BrowserTracing()],
  //   // Set tracesSampleRate to 1.0 to capture 100%
  //   // of transactions for performance monitoring.
  //   // We recommend adjusting this value in production
  //   tracesSampleRate: 1.0,
  // });
}

function log(error) {
  // Sentry.captureException(error);
  console.log("Error", error);
}

export default {
  init,
  log,
};
