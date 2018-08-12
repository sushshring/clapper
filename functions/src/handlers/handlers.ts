import { Request }               from 'express';
import { Observable }            from 'rxjs';

export interface WebhookHandler {
  handle(request: Request): Observable<any>;
  install(request: Request): Observable<any>;
}

export { GithubHandler } from './githubHandler';
export { DefaultHandler } from './defaultHandler';
export { HWInstallationHandler } from './HWInstallationHandler';
