import { Request }           from 'express';
import { Crypto }            from '../TSCommon/Crypto';
import { GithubRequestData } from '../models/GithubRequestData';
import { logger }            from '../TSCommon/logger';
import TsCommonEnv           from '../TSCommon/TsCommonEnv';
import { WebhookHandler }    from './handlers';

export class GithubHandler implements WebhookHandler {
  handle(request: Request): Promise<any> {
    return this.innerHandle(GithubRequestData.parseFromHttp(request));
  }

  private innerHandle(request: GithubRequestData) {
    if (!Crypto.verify(request.signature,
                       request.data,
                       TsCommonEnv.GITHUB_WEBHOOK_SECRET)) {
      return Promise.reject('Could not verify incoming webhook');
    }
    // Handle Github event.
    logger.info(request);
    return Promise.resolve();
  }

  install(request: Request): Promise<any> {
    return Promise.resolve();
  }
}
