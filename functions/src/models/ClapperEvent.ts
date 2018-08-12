import * as admin                          from 'firebase-admin';
import { DatabaseModel }                   from '../database/DatabaseModel';
import { GithubEvent }                     from './Github/GithubEvent';
import { GithubRequestData, Installation } from './models';
import { RequestData }                     from './RequestData';
import DataSnapshot = admin.database.DataSnapshot;

export class ClapperEvent implements DatabaseModel {
  collection: string;
  ref: string;
  type: any;
  action: string;

  constructor(hwId: string) {
    this.collection = `installations`;
    this.ref = hwId;
  }

  static from<T extends RequestData>(installation: Installation, request: T) {
    const clapperEvent = new ClapperEvent(installation.mqttRef);
    if (request instanceof GithubRequestData) {
      // @ts-ignore
      const githubRequest = <GithubRequestData>request;
      clapperEvent.type = githubRequest.event;
    }
    // TODO: Add support for multiple actions.
    clapperEvent.action = 'CLAP';
    return clapperEvent;
  }

  marshall() {
    return {
      type: GithubEvent[this.type],
      action: this.action,
      time: new Date().getTime(),
    };
  }

  unmarshall(data: DataSnapshot) {
  }

}
