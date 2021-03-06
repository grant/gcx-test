import {deploy} from 'gcx';
const { readdirSync, lstatSync } = require('fs');
const CREDS_FILE_LOCATION = process.env.GOOGLE_APPLICATION_CREDENTIALS || '';
const CREDS_FILE = require(CREDS_FILE_LOCATION);
console.log(`Using creds: ${CREDS_FILE_LOCATION}`);

const REGION = 'us-central1';
const PROJECT_ID = CREDS_FILE.project_id;

interface iDeployFunction {
  name: string,
  entryPoint: string,
  targetDir: string,
};

/**
 * Deploys a cloud function.
 * @param {string} name The title of the function endpoint.
 * @param {string} entryPoint The function name.
 * @param {string} targetDir The path to the source directory.
 * @example 
 */
const deployFunction = async ({ name, entryPoint, targetDir }: iDeployFunction) => {
  console.log(`Deploying ${name}...`);
  try {
    await deploy({
      name,
      region: REGION,
      runtime: 'nodejs8',
      targetDir, // important!
      description: 'test desc',
      retry: true,
      // maxInstances: 10, Alpha feature that needs whitelisting
      triggerHTTP: true,
      triggerEvent: 'http',
      entryPoint,
      project: PROJECT_ID,
    });
  } catch (e) {
    console.log(`Errors: ${e}`);
  }
};

/**
 * Lists the exported functions in a file.
 * @param {string} filename The file.
 * @returns {string[]} A list of function names.
 */
const listFunctions = (filename: string) => {
  const fns = require(filename);
  const fnNames = Object.keys(fns);
  return fnNames;
};

/**
 * Gets a list of directories within the functions directory.
 * @returns {string[]} A list of paths to directories.
 */
const BASE_DIR = './functions';
const getFunctionDirectories = () => {
  const directories: any = [];
  readdirSync(BASE_DIR).map((subdir: string) => {
    const dir = `${BASE_DIR}/${subdir}`;
    if (lstatSync(dir).isDirectory()) {
      directories.push(subdir);
    }
  });
  return directories;
};

/**
 * Deploys all functions in all directories.
 */
const deployAll = async () => {

  // export GCLOUD_PROJECT=test-grant
  // export GOOGLE_APPLICATION_CREDENTIALS="./creds.json"

  const functionDirectories = getFunctionDirectories();
  functionDirectories.map((directory: string) => {
    const absoluteDir = `${BASE_DIR}/${directory}`
    const functionNames = listFunctions(absoluteDir);
    functionNames.map(async (functionName) => {
      const name = `${directory}-${functionName}`;
      await deployFunction({
        name,
        entryPoint: functionName,
        targetDir: absoluteDir,
      });
      console.log(getURL(name));
    });
  });
}

/**
 * Gets the HTTP trigger URL for the Cloud Function
 * @param {string} functionName The function name.
 */
const getURL = (functionName: string) => {
  return `https://${REGION}-${PROJECT_ID}.cloudfunctions.net/${functionName}`;
}

/**
 * Tests the fn directories.
 */
const testFnDirs = () => {
  const functionDirectories = getFunctionDirectories();
  functionDirectories.map((directory: string) => {
    const fns = listFunctions(directory);
    console.log(`- ${directory}: [${fns}]`);
  });
}

// testFnDirs();
deployAll();
