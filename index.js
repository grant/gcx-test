const gcx = require('gcx');

const {readdirSync, lstatSync} = require('fs');
const CREDS_FILE_LOCATION = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const CREDS_FILE = require(CREDS_FILE_LOCATION);
console.log(`Using creds: ${CREDS_FILE_LOCATION}`);

/**
 * Deploys a cloud function.
 * @param {string} name The name of the function in the directory.
 * @param {string} targetDir The path to the source directory.
 * @example 
 */
const deploy = async (name, targetDir) => {
  console.log(`Deploying ${name}...`);
  try {
    await gcx.deploy({
      name,
      region: 'us-central1',
      runtime: 'nodejs8',
      targetDir, // important!
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
  console.log(`Deployed ${name}!`);
};

/**
 * Lists the exported functions in a file.
 * @param {string} filename The file.
 * @returns {string[]} A list of function names.
 */
const listFunctions = (filename) => {
  const fns = require(filename);
  const fnNames = Object.keys(fns);
  return fnNames;
};

/**
 * Gets a list of directories within the functions directory.
 * @returns {string[]} A list of paths to directories.
 */
const getFunctionDirectories = () => {
  const BASE_DIR = './functions';
  const directories = [];
  readdirSync(BASE_DIR).map((subdir) => {
    const dir = `${BASE_DIR}/${subdir}`;
    if (lstatSync(dir).isDirectory()) {
      directories.push(dir);
    }
  });
  return directories;
};

/**
 * Deploys all functions in all directories.
 */
const deployAll = () => {
  const functionDirectories = getFunctionDirectories();
  functionDirectories.map(directory => {
    const fns = listFunctions(directory);
    fns.map((fn) => {
      deploy(fn, directory);
    });
  });
}

/**
 * Tests the fn directories.
 */
const testFnDirs = () => {
  const functionDirectories = getFunctionDirectories();
  functionDirectories.map(directory => {
    const fns = listFunctions(directory);
    console.log(`- ${directory}: [${fns}]`);
  });
}

// testFnDirs();
deployAll();