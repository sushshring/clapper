import { FirestoreModel } from '../database/FirestoreModel';

export class Installation extends FirestoreModel {
  collection: string;
  createTime: FirebaseFirestore.Timestamp;
  updateTime: FirebaseFirestore.Timestamp;
}
