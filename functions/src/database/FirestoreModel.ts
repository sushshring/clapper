import * as admin from 'firebase-admin';

export abstract class FirestoreModel {

  database: admin.firestore.Firestore;
  protected abstract collection: string;
  protected abstract ref: string;
  protected abstract get marshall();

  get() {
    return this.database.collection(this.collection).doc(this.ref).get();
  }

  save() {
    return this.database
      .collection(this.collection)
      .doc(this.ref)
      .set(this.marshall);
  }
}
