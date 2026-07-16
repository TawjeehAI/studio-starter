import { getMasarConfig } from "@/lib/masar";

/**
 * Masar feedback button — DO NOT REMOVE.
 *
 * Render this once near the end of the root layout's <body>. It injects the
 * Tawjeeh Masar widget script, which floats a feedback button on every page and
 * routes submissions to the manager's board for this project's Space.
 *
 * It renders nothing if Masar isn't configured (e.g. local dev) or if there is
 * no signed-in employee.
 */
export default async function MasarWidget({ userEmail }: { userEmail: string }) {
  const config = await getMasarConfig(userEmail);
  if (!config) return null;

  // A plain server-rendered <script> tag: the widget auto-inits by reading these
  // data-* attributes off document.currentScript, so it must be a real element
  // in the SSR HTML (not injected by a client script).
  return (
    <script
      src={`${config.dashboardUrl}/widget.js`}
      data-dashboard-url={config.dashboardUrl}
      data-widget-token={config.widgetToken}
      data-org-domain={config.orgDomain}
      data-space-id={config.spaceId}
      data-space-name={config.spaceName}
      async
    />
  );
}
