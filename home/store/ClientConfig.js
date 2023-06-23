/**
 * Object to store client config
 *
 */
 export default class ClientConfig {
    constructor(config, req, res) {
      /** @type {object} global config */
      this.config = config;
      /** @type {import('http').IncomingMessage & { cookies: {[key: string]: string}}} Request object */
      this.req = req;
      /** @type {import('http').ServerResponse} Response object */
      this.res = res;
    }
  }
  