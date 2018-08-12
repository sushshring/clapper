import { Request }                   from 'express';
import { inject }                    from 'inversify';
import { Observable, throwError }    from 'rxjs';
import { map, switchMap, take }      from 'rxjs/operators';
import { DatabaseService }           from '../database/DatabaseService';
import { HttpError }                 from '../models/HttpError';
import {
  Installation,
  InstallationState,
  GithubRequestData,
}                                    from '../models/models';
import { EventOrchestrationService } from '../services/EventOrchestrationService';
import { SERVICE_IDENTIFIER }        from '../TSCommon/Constants';
import { Crypto }                    from '../TSCommon/Crypto';
import TsCommonEnv                   from '../TSCommon/TsCommonEnv';
import { WebhookHandler }            from './handlers';

export class GithubHandler implements WebhookHandler {
  constructor(@inject(SERVICE_IDENTIFIER.DatabaseService)
              private databaseService: DatabaseService,
              @inject(SERVICE_IDENTIFIER.OrchestrationService)
              private eventOrchestrationService: EventOrchestrationService) {
  }

  handle(request: Request): Observable<any> {
    return this.innerHandle(GithubRequestData.parseFromHttp(request));
  }

  private innerHandle(request: GithubRequestData) {
    if (!Crypto.verify(request.signature,
                       request.data,
                       TsCommonEnv.GITHUB_WEBHOOK_SECRET)) {
      return throwError('Could not verify incoming webhook');
    }
    // Handle Github event.
    const installation = new Installation(request.data.installationId);
    return this.databaseService.get(installation.collection, installation.ref)
      .pipe(
        take(1),
        map(dataSnapshot => installation.unmarshall(dataSnapshot)),
        map((installation: Installation) => {
          switch (installation.state) {
            case InstallationState.HARDWARE_CONNECTED:
              return installation;
            default:
            case InstallationState.ACCOUNT_CONNECTED:
              throw new HttpError('No hardware found', 401);
          }
        }),
        switchMap(this.eventOrchestrationService.handleEvent),
      );
  }

  install(request: Request): Observable<any> {
    return this.innerInstall(GithubRequestData.parseFromHttp(request));
  }

  private innerInstall(request: GithubRequestData) {
    if (!Crypto.verify(request.signature,
                       request.data,
                       TsCommonEnv.GITHUB_WEBHOOK_SECRET)) {
      return throwError('Could not verify incoming webhook');
    }
    // Handle Github Installation.
    const installation = new Installation(request.data.installation.id, null,
                                          InstallationState.ACCOUNT_CONNECTED);
    return this.databaseService.put(installation)
      .pipe(
        take(1),
      );
  }
}
