import * as functions from 'firebase-functions';
import { logger }     from './logger';

export default class Env {
  public static getEnvValue(namespace: string, key: string, defaultValue: any) {
    try {
      const value = functions.config()[namespace][key];
      return value || defaultValue;
    } catch (error) {
      logger.info(error);
      return defaultValue;
    }
  }
}
