import { Request }           from 'express';
import { WebhookHandler }    from './handlers';

export class DefaultHandler implements WebhookHandler {
  handle(request: Request): Promise<any> {
    throw new Error('Default handler is unsupported.');
  }

  install(request: Request): Promise<any> {
    throw new Error('Default handler is unsupported.');
  }
}
