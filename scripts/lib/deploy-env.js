// Which deployment this build is for — production, a preview deploy, or
// someone's laptop.
//
// The site is static and every environment is a *separate build*, so this is
// answerable at build time and needs no runtime detection: nothing has to ship
// to the browser to sniff its own hostname. (wavekat-platform is a SPA served
// from one bundle, so it does the equivalent check at startup instead — see
// its apps/web/src/lib/env.ts.)
//
// The signals are ones the pipeline already sets, so nothing new has to be
// wired into CI:
//
//   SITE_ASSET_ORIGIN  set only by .github/workflows/preview.yml
//   CF_PAGES_BRANCH    set only by Cloudflare Pages, which builds production
//                      from `main` — every other branch there is a preview
//
// Anything else is a working copy. That makes a local `npm run build` a `dev`
// build rather than a counterfeit production one, which is the honest answer
// and the useful one: the favicon it produces says so.

/** @typedef {'dev' | 'preview' | 'prod'} DeployEnv */

/** The environments, in the order a reader most likely wants them. */
export const DEPLOY_ENVS = /** @type {const} */ (["dev", "preview", "prod"]);

/**
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {DeployEnv}
 */
export function deployEnv(env = process.env) {
  // An explicit override, so any environment's output can be reproduced
  // locally: `WK_DEPLOY_ENV=preview npm run sync`.
  const override = env.WK_DEPLOY_ENV?.trim();
  if (override) {
    if (DEPLOY_ENVS.includes(/** @type {DeployEnv} */ (override))) {
      return /** @type {DeployEnv} */ (override);
    }
    // Silently ignoring this would hand back `dev` and look like the override
    // simply didn't take, which is a confusing thing to debug.
    console.warn(
      `[env] ignoring WK_DEPLOY_ENV=${override} — expected one of ${DEPLOY_ENVS.join(", ")}`,
    );
  }

  if (env.SITE_ASSET_ORIGIN?.trim()) return "preview";

  const branch = env.CF_PAGES_BRANCH?.trim();
  if (branch) return branch === "main" ? "prod" : "preview";

  return "dev";
}
