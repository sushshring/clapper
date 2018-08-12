import { Request }        from 'express';
import { Observable }     from 'rxjs';
import { WebhookHandler } from './handlers';

export class DefaultHandler implements WebhookHandler {
  handle(request: Request): Observable<any> {
    throw new Error('Default handler is unsupported.');
  }

  install(request: Request): Observable<any> {
    throw new Error('Default handler is unsupported.');
  }
}
