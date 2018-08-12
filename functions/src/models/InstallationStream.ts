import * as admin        from 'firebase-admin';
import { DatabaseModel } from '../database/DatabaseModel';
import DataSnapshot = admin.database.DataSnapshot;

export class InstallationStream implements DatabaseModel {
  public installationHWID: string;

  constructor(installationHWID: string) {
    this.installationHWID = installationHWID;
  }

  collection: string;
  ref: string;

  marshall() {
    return {
      installationHWID: this.installationHWID,
    };
  }

  unmarshall(data: DataSnapshot) {
  }
}
