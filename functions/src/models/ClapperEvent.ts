import * as admin        from 'firebase-admin';
import { DatabaseModel } from '../database/DatabaseModel';
import DataSnapshot = admin.database.DataSnapshot;

export class ClapperEvent implements DatabaseModel {
  collection: string;
  ref: string;

  marshall() {
    return null;
  }

  unmarshall(data: DataSnapshot) {
  }
}
