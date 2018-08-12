import { Observable }    from 'rxjs';
import { DatabaseModel } from './DatabaseModel';

export interface DatabaseService {
  put(data: DatabaseModel, generateKey?: boolean): Observable<any>;
  get(collection: string, ref: string): Observable<any>;
}
