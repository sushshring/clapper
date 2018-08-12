import { Observable }                 from 'rxjs';
import { ClapperEvent} from '../models/models';

export interface OrchestrationService {
  handleEvent(event: ClapperEvent): Observable<any>;
}
