require("dotenv").config();
const { notarize } = require("@electron/notarize");

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== "darwin") {
    return;
  }

  const { APPLEID, APPLEIDPASS, APPLETEAMID } = process.env;
  const missing = [
    ["APPLEID", APPLEID],
    ["APPLEIDPASS", APPLEIDPASS],
    ["APPLETEAMID", APPLETEAMID]
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(
      `Cannot notarize: ${missing.join(", ")} not set. ` +
        "APPLEIDPASS must be an app-specific password from appleid.apple.com."
    );
  }

  const appName = context.packager.appInfo.productFilename;

  await notarize({
    tool: "notarytool",
    appPath: `${appOutDir}/${appName}.app`,
    appleId: APPLEID,
    appleIdPassword: APPLEIDPASS,
    teamId: APPLETEAMID
  });
};
