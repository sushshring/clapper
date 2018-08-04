import { Request }     from 'express';
import { GithubEvent } from './GithubEvent';
import { RequestData } from '../RequestData';

export class GithubInstallationData implements RequestData {
  signature: string;
  event: GithubEvent;
  data: any;
  installationHWID: string;

  constructor(signature: string, event: GithubEvent, data: any) {
    this.signature        = signature;
    this.event            = event;
    this.data             = data;
    this.installationHWID = data.installationId;
  }

  private static parseGithubEvent(event: string): GithubEvent {
    switch (event) {
      default:
        return GithubEvent.PULL_REQUEST;
    }
  }

  public static parseFromHttp(request: Request) {
    const signature = request.headers['x-hub-signature'];
    if (!signature) {
      throw new Error('Signature not provided');
    }
    const event = request.headers['x-github-event'];
    if (!event) {
      throw new Error('Event not provided');
    }
    return new GithubInstallationData(signature.toString(),
                                      GithubInstallationData.parseGithubEvent(event.toString()),
                                      request.body);
  }
}
