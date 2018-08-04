import { FirestoreModel } from '../database/FirestoreModel';

export class Installation extends FirestoreModel {
  protected collection: string;
  protected ref: string;

  uid: string;
  mqttRef: string;

  constructor(uid: string, mqttRef: string) {
    super();
    this.collection = 'installations';
    this.uid        = uid;
    this.ref        = uid;
    this.mqttRef    = mqttRef;
  }

  get marshall() {
    return {
      mqttRef: this.mqttRef
    };
  }
}
