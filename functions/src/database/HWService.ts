import * as admin           from 'firebase-admin';
import { injectable }       from 'inversify';
import { from, Observable } from 'rxjs';
import { HttpError }        from '../models/HttpError';
import { DatabaseModel }    from './DatabaseModel';
import { DatabaseService }  from './DatabaseService';

@injectable()
export class HWService implements DatabaseService {
  private rtDatabase: admin.database.Database;

  constructor() {
    this.rtDatabase = admin.database();
  }

  get(collection: string, ref: string): Observable<any> {
    return from(
      new Promise((resolve) => {
        this.rtDatabase.ref(collection)
          .child(ref)
          .on('value', (snapshot) => {
            if (!snapshot.exists()) {
              throw new HttpError('Object not found', 404);
            }
            resolve(snapshot.val());
          });
      }),
    );
  }

  put(data: DatabaseModel, generateKey: boolean = false): Observable<void> {
    return from(
      generateKey ?
        this.rtDatabase.ref(data.collection)
          .child(data.ref)
          .push()
          .set(data.marshall()) :
        this.rtDatabase.ref(data.collection)
          .child(data.ref)
          .set(data.marshall()),
          );
  }
}
