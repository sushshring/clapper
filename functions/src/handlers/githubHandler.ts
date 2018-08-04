import { Request }                from 'express';
import { GithubInstallationData } from '../models/Github/GithubInstallationData';
import { Crypto }                 from '../TSCommon/Crypto';
import { GithubRequestData }      from '../models/Github/GithubRequestData';
import TsCommonEnv                from '../TSCommon/TsCommonEnv';
import { WebhookHandler }         from './handlers';

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
    request.data
    return Promise.resolve(request);
  }

  install(request: Request): Promise<any> {
    return this.innerInstall(GithubInstallationData.parseFromHttp(request));
  }

  private innerInstall(request: GithubRequestData) {
    if (!Crypto.verify(request.signature,
                       request.data,
                       TsCommonEnv.GITHUB_WEBHOOK_SECRET)) {
      return Promise.reject('Could not verify incoming webhook');
    }
    // Handle Github Installation.

    return Promise.resolve();
  }
}
