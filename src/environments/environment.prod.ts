import packageJson from '../../package.json';

export const environment = {
  VERSION: packageJson.version,
  production: true,
  restUrl: 'http://localhost:8080/rainments-wss/',
  httpDelay: 0
};
