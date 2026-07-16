/**
 * Masar feedback wiring — DO NOT REMOVE.
 *
 * Every app built in Tawjeeh Studio ships with the Masar feedback widget so the
 * manager who built this system receives feedback from the employees who use it.
 *
 * This file mints a short-lived widget token server-side using the issuer secret,
 * exactly as documented by the dashboard's POST /api/widget/token endpoint. The
 * token is then handed to the widget <script> tag (see components/MasarWidget.tsx).
 *
 * The four MASAR_* env vars are injected automatically when this project is
 * provisioned. You never need to set them by hand.
 */

export type MasarConfig = {
  dashboardUrl: string;
  orgDomain: string;
  spaceId: string;
  spaceName?: string;
  widgetToken: string;
  expiresAt?: string;
};

const dashboardUrl = process.env.MASAR_DASHBOARD_URL ?? "";
const issuerSecret = process.env.MASAR_ISSUER_SECRET ?? "";
const orgDomain = process.env.MASAR_ORG_DOMAIN ?? "";
const spaceId = process.env.MASAR_SPACE_ID ?? "";
const spaceName = process.env.MASAR_SPACE_NAME ?? undefined;

/**
 * Mint a widget token for the signed-in employee. Returns null if Masar isn't
 * configured yet (so local dev without the env vars still renders the app).
 *
 * @param userEmail  the signed-in employee's email; must be a member of the org.
 */
export async function getMasarConfig(userEmail: string): Promise<MasarConfig | null> {
  if (!dashboardUrl || !issuerSecret || !orgDomain || !spaceId) return null;
  if (!userEmail) return null;

  const res = await fetch(`${dashboardUrl}/api/widget/token`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-widget-issuer-secret": issuerSecret
    },
    body: JSON.stringify({ userEmail, pageDomain: orgDomain, spaceId }),
    // Tokens are per-user and short-lived; never cache across users.
    cache: "no-store"
  });

  if (!res.ok) return null;
  const json = (await res.json()) as { token?: string };
  if (!json.token) return null;

  return {
    dashboardUrl,
    orgDomain,
    spaceId,
    spaceName,
    widgetToken: json.token
  };
}
