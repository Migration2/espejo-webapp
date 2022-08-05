// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
};
export const DOMAIN = location.hostname
export const URL_WEBSOCKET = `https://${DOMAIN}:4547/bicirio-websocket`;
export const POOLLING_TIME_IN_MILLIS:number = 10000;
