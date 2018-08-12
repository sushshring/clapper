import { inject, injectable } from 'inversify';
import { Observable, of } from 'rxjs';
import { DatabaseService }    from '../database/DatabaseService';
import { SERVICE_IDENTIFIER } from '../TSCommon/Constants';

@injectable()
export class EventOrchestrationService {
  constructor(@inject(SERVICE_IDENTIFIER.HWService) private hwService: DatabaseService) {
    this.hwService = hwService;
  }

  handleEvent(): Observable<any> {
    // TODO: Handle.
    return of(null);
  }
}
