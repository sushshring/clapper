import { Request }              from 'express';
import * as _                   from 'lodash';
import { Observable, forkJoin } from 'rxjs';
import { take, map }            from 'rxjs/operators';
import { DatabaseService }      from '../database/DatabaseService';
import {
  HWInstallationData,
  Installation,
  InstallationState,
  InstallationStream,
}                               from '../models/models';
import { WebhookHandler }       from './handlers';

export class HWInstallationHandler implements WebhookHandler {

  constructor(private databaseService: DatabaseService, private firestoreService: DatabaseService) {
  }

  handle(request: Request): Observable<any> {
    throw new Error('Cannot call handle on Hardware webhook handler.');
  }

  private innerInstall(request: HWInstallationData): Observable<any> {
    // TODO: Verify source using some type of header/signature.

    // Handle hardware installation.
    const installationStream = new InstallationStream(request.hwId);
    const installation       = new Installation(request.installationId);
    installation.state       = InstallationState.HARDWARE_CONNECTED;
    installation.mqttRef     = request.hwId;
    return forkJoin(
      this.databaseService.put(installationStream),
      this.firestoreService.put(installation),
    )
      .pipe(
        take(1),
        map(([data1, data2]) => _.assign(data1, data2)),
      );
  }

  install(request: Request): Observable<any> {
    return this.innerInstall(HWInstallationData.parseFromHttp(request));
  }
}
