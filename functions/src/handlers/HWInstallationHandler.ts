import { Request }                                             from 'express';
import { Observable }                                          from 'rxjs';
import { take }                                                from 'rxjs/operators';
import { DatabaseService }                                     from '../database/DatabaseService';
import { HWInstallationData, Installation, InstallationState } from '../models/models';
import { WebhookHandler }                                      from './handlers';

export class HWInstallationHandler implements WebhookHandler {
  private databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  handle(request: Request): Observable<any> {
    throw new Error('Cannot call handle on Hardware webhook handler.');
  }

  private innerInstall(request: HWInstallationData): Observable<any> {
    // TODO: Verify source using some type of header/signature.

    // Handle hardware installation.
    const installation = new Installation(request.installationId,
                                          request.hwId,
                                          InstallationState.HARDWARE_CONNECTED);
    return this.databaseService.put(installation)
      .pipe(
        take(1),
      );
  }

  install(request: Request): Observable<any> {
    return this.innerInstall(HWInstallationData.parseFromHttp(request));
  }
}
