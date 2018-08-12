import * as admin        from 'firebase-admin';
import { DatabaseModel } from '../database/DatabaseModel';
import DataSnapshot = admin.database.DataSnapshot;

/**
 * Represents a "state machine" for the installation.
 * NONE -> Default. No installation exists.
 * ACCOUNT_CONNECTED -> An installation was started for a
 *                    some provider, but no hardware connected yet.
 * HARDWARE_CONNECTED -> Hardware is successfully connected and
 *                      installation is ready to go.
 */
export enum InstallationState {
  NONE,
  ACCOUNT_CONNECTED,
  HARDWARE_CONNECTED,
}

export class Installation implements DatabaseModel {
  public collection: string;
  public ref: string;
  public state: InstallationState;
  public uid: string;
  public mqttRef: string;

  constructor(uid: string, mqttRef?: string, state: InstallationState = InstallationState.NONE) {
    this.collection = 'installations';
    this.uid        = uid;
    this.ref        = uid;
    this.mqttRef    = mqttRef;
    this.state      = state;
  }

  marshall() {
    return {
      mqttRef: this.mqttRef,
      state: this.state.toString(),
    };
  }

  unmarshall(data: any) {
    const value = data.data();
    this.mqttRef = value.mqttRef;
    this.state = value.state;
    return this;
  }
}
