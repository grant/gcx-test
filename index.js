const gcx = require('gcx');

const TARGET_DIR = './functions/test1';
const CREDS_FILE_LOCATION = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const CREDS_FILE = require(CREDS_FILE_LOCATION);
console.log(`Using creds: ${CREDS_FILE_LOCATION}`);

/**
 * Deploys a cloud function.
 * @param {string} name The name of the function in the TARGET_DIR.
 */
const deploy = async (name) => {
  console.log(`Deploying ${name}...`);
  try {
    const dep = await gcx.deploy({
      name,
      region: 'us-central1',
      runtime: 'nodejs8',
      targetDir: TARGET_DIR, // important!
      description: 'test desc',
      retry: true,
      // maxInstances: 10, Alpha feature that needs whitelisting
      triggerHTTP: true,
      triggerEvent: 'http',
      entryPoint: name,
      project: CREDS_FILE.project_id,
    });
  } catch (e) {
    console.log(`Errors: ${e}`);
  }
};

/**
 * Lists the exported functions in a file.
 */
const listFunctions = (dir) => {
  const fns = require(dir);
  const fnNames = Object.keys(fns);
  return fnNames;
};

const fns = listFunctions(TARGET_DIR);
fns.map((fn) => {
  deploy(fn);
});