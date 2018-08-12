import * as admin from 'firebase-admin';
import DataSnapshot = admin.database.DataSnapshot;

export interface DatabaseModel {
  collection: string;
  ref: string;

  marshall();
  unmarshall(data: DataSnapshot);
}
