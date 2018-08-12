import { Container }                   from 'inversify';
import 'reflect-metadata';
import { FirestoreService, HWService } from '../database/database';
import { EventOrchestrationService }   from '../services/EventOrchestrationService';
import { SERVICE_IDENTIFIER }          from './Constants';

const container = new Container();

// Container bindings for DI.
container.bind(SERVICE_IDENTIFIER.DatabaseService).to(FirestoreService);
container.bind(SERVICE_IDENTIFIER.HWService).to(HWService);
container.bind(SERVICE_IDENTIFIER.OrchestrationService).to(EventOrchestrationService);
export default container;
