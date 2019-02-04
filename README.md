# Test GCX as a module

Requires auth setup defined here:
https://github.com/JustinBeckwith/gcx

- https://console.cloud.google.com/functions/list?project=test-grant

## Deploy functions

```sh
tsc -p ./functions/ && node .
```

## Test

- Create a Cloud Project with the Functions API enabled.
- Create a service account and download the credentials to `creds.json`
- Export the env vars below and run the test file.

```sh
export GCLOUD_PROJECT=test-grant
export GOOGLE_APPLICATION_CREDENTIALS="./creds.json"
node .
```

## TODO

- Publish types to be consumable outside functions repo with `tsc -d`.
- Corp Issue Tracker API