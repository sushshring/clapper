import { Container }                   from 'inversify';
import { FirestoreService, HWService } from '../database/database';
import { DatabaseService }             from '../database/DatabaseService';
import { EventOrchestrationService }   from '../services/EventOrchestrationService';
import { OrchestrationService }        from '../services/OrchestrationService';
import { SERVICE_IDENTIFIER }          from './Constants';

const container = new Container();

// Container bindings for DI.
container.bind<DatabaseService>(SERVICE_IDENTIFIER.DatabaseService).to(FirestoreService);
container.bind<DatabaseService>(SERVICE_IDENTIFIER.HWService).to(HWService);
container.bind<OrchestrationService>(SERVICE_IDENTIFIER.OrchestrationService).to(
  EventOrchestrationService);
export default container;
