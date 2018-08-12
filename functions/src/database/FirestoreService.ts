import * as admin           from 'firebase-admin';
import { injectable }       from 'inversify';
import { from, Observable } from 'rxjs';
import { take, map, tap }   from 'rxjs/operators';
import { HttpError }        from '../models/HttpError';
import { logger }           from '../TSCommon/logger';
import { DatabaseService }  from './DatabaseService';
import { DatabaseModel }    from './DatabaseModel';

@injectable()
export class FirestoreService implements DatabaseService {
  private firestore: admin.firestore.Firestore;

  constructor() {
    this.firestore = admin.firestore();
  }

  get(collection: string, ref: string) {
    return from(
      this.firestore.collection(collection).doc(ref.toString()).get(),
    ).pipe(
      take(1),
      map((data) => {
        if (!data.exists) {
          throw new HttpError('Object not found', 404);
        }
        return data;
      }),
    );
  }

  put(data: DatabaseModel, generateKey: boolean = false): Observable<any> {
    return from(
      this.firestore.collection(data.collection).doc(generateKey ? undefined : data.ref)
        .set(data.marshall()),
    );
  }
}
