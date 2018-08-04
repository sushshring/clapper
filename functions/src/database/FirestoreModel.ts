import * as admin from 'firebase-admin';

export abstract class FirestoreModel {
  ref: string;
  exists: boolean;
  id: string;
  createTime?: FirebaseFirestore.Timestamp;
  updateTime?: FirebaseFirestore.Timestamp;
  readTime: FirebaseFirestore.Timestamp;
  database: admin.firestore.Firestore;
  abstract collection: string;

  async data() {
    const data = await this.database.collection(this.collection).doc(this.ref).get();
  }

  get(fieldPath: string | FirebaseFirestore.FieldPath) {
    throw new Error('Method not implemented.');
  }

  isEqual(other: FirebaseFirestore.DocumentSnapshot): boolean {
    throw new Error('Method not implemented.');
  }
}
