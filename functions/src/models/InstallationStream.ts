import * as admin        from 'firebase-admin';
import { DatabaseModel } from '../database/DatabaseModel';
import DataSnapshot = admin.database.DataSnapshot;

export class InstallationStream implements DatabaseModel {
  public installationHWID: string;

  constructor(installationHWID: string) {
    this.installationHWID = installationHWID;
    this.ref = installationHWID;
    this.collection = 'installations';
  }

  collection: string;
  ref: string;

  marshall() {
    return {
      hwId: this.installationHWID,
      updated: new Date().getTime(),
    };
  }

  unmarshall(data: DataSnapshot) {
  }
}
