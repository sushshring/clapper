import { Request }                                              from 'express';
import { take }                                                 from 'rxjs/operators';
import { URL }                                                  from 'url';
import { GithubHandler, WebhookHandler, HWInstallationHandler } from '../handlers/handlers';
import { SERVICE_IDENTIFIER }                                   from '../TSCommon/Constants';
import Installer                                                from '../TSCommon/Installer';
import { logger }                                               from '../TSCommon/logger';
import { Sources }                                              from './sources';

export class Source {
  private readonly source?: Sources;
  private readonly handler: WebhookHandler;

  public static parseSourceFromUrl(url: URL): Source {
    logger.warn(url);
    switch (url.origin) {
      case 'github.com':
      case 'smee.io':
        return new Source(Sources.GITHUB);
      case 'http://localhost:5000':
      case 'https://firebase-functions.com': // TODO: Change to actual source.
        return new Source(Sources.HWINSTALLER);
      default:
        return new Source();
    }
  }

  protected constructor(source?: Sources) {
    this.source = source;
    switch (this.source) {
      case Sources.GITHUB:
      default:
        this.handler = new GithubHandler(Installer.get(SERVICE_IDENTIFIER.DatabaseService),
                                         Installer.get(SERVICE_IDENTIFIER.OrchestrationService));
        break;
      case Sources.HWINSTALLER:
        this.handler = new HWInstallationHandler(Installer.get(SERVICE_IDENTIFIER.HWService));
        break;
      // default:
      //   this.handler = new DefaultHandler();
      //   break;
    }
  }

  handleWebhook(request: Request): Promise<any> {
    return this.handler.handle(request)
      .pipe(
        take(1),
      )
      .toPromise();
  }

  install(request: Request): Promise<any> {
    return this.handler.install(request)
      .pipe(
        take(1),
      )
      .toPromise();
  }
}
