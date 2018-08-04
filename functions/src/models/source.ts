import { Request }                                       from 'express';
import { URL }                                           from 'url';
import { DefaultHandler, GithubHandler, WebhookHandler } from '../handlers/handlers';
import { logger }                                        from '../TSCommon/logger';
import { Sources }                                       from './sources';

export class Source {
  private readonly source?: Sources;
  private readonly handler: WebhookHandler;

  public static parseSourceFromUrl(url: URL): Source {
    switch (url.hostname) {
      case 'github.com':
      case 'smee.io':
      case 'localhost:5000':
        return new Source(Sources.GITHUB);
      default:
        return new Source();
    }
  }

  protected constructor(source?: Sources) {
    this.source = source;
    switch (this.source) {
      case Sources.GITHUB:
        this.handler = new GithubHandler();
        break;
      default:
        this.handler = new DefaultHandler();
        break;
    }
  }

  handleWebhook(request: Request): Promise<any> {
    return this.handler.handle(request);
  }

  installWebhook(request: Request) {
    return this.handler.install(request);
  }
}
