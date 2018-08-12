import { inject, injectable }   from 'inversify';
import { Observable}       from 'rxjs';
import { DatabaseService }      from '../database/DatabaseService';
import { ClapperEvent }         from '../models/ClapperEvent';
import { SERVICE_IDENTIFIER }   from '../TSCommon/Constants';
import { OrchestrationService } from './OrchestrationService';

@injectable()
export class EventOrchestrationService implements OrchestrationService {
  constructor(@inject(SERVICE_IDENTIFIER.HWService) private hwService: DatabaseService) {
    this.hwService = hwService;
  }

  handleEvent(eventData: ClapperEvent): Observable<any> {
    console.log(eventData);
    return this.hwService.put(eventData, true);
  }
}
