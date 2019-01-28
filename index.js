const gcx = require('gcx');
console.log('Testing...');

const run = async () => {
  try {
    const dep = await gcx.deploy({
      name: 'function-name',
      region: 'us-central1',
      runtime: 'nodejs8',
      targetDir: './functions',
      description: 'test desc',
      retry: true,
      // memory:
      // network
      maxInstances: 10,
      // timeout
      triggerHTTP: true,
      // triggerTopic
      // triggerBucket
      // triggerResource
      triggerEvent: 'http',
      entryPoint: 'helloWorld',
      project: 'test-grant',
    });
    console.log(dep.response);
  } catch (e) {
    console.log(e.response.data.error.errors[0]);
  }
};

run();
