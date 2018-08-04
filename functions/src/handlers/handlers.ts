import { Request }     from 'express';

export interface WebhookHandler {
  handle(request: Request): Promise<any>;

  install(request: Request): Promise<any>;
}

export { GithubHandler } from './githubHandler';
export { DefaultHandler } from './defaultHandler';
