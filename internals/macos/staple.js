require("dotenv").config();
const { execFile } = require("child_process");
const { promisify } = require("util");

const run = promisify(execFile);

exports.default = async function stapleDiskImages(context) {
  const dmgs = context.artifactPaths.filter(path => path.endsWith(".dmg"));
  if (dmgs.length === 0) {
    return;
  }

  const { APPLEID, APPLEIDPASS, APPLETEAMID } = process.env;
  if (!APPLEID || !APPLEIDPASS || !APPLETEAMID) {
    throw new Error(
      "Cannot notarize disk images: APPLEID, APPLEIDPASS and APPLETEAMID must be set"
    );
  }

  for (const dmg of dmgs) {
    // The afterSign ticket covers the .app only; the image is built after it and needs its own.
    const { stdout } = await run("xcrun", [
      "notarytool",
      "submit",
      dmg,
      "--apple-id",
      APPLEID,
      "--password",
      APPLEIDPASS,
      "--team-id",
      APPLETEAMID,
      "--wait",
      "--timeout",
      "30m"
    ]);

    if (!stdout.includes("status: Accepted")) {
      throw new Error(`Notarization did not return Accepted for ${dmg}`);
    }

    await run("xcrun", ["stapler", "staple", dmg]);
    console.log(`  • notarized and stapled  file=${dmg}`);
  }
};
