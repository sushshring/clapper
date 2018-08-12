import { Request }     from 'express';
import { HttpError }   from '../HttpError';
import { RequestData } from '../RequestData';
import { GithubEvent } from './GithubEvent';

export class GithubRequestData extends RequestData {
  signature: string;
  event: GithubEvent;
  installationId: string;

  constructor(signature: string, event: GithubEvent, data: any) {
    super();
    this.signature      = signature;
    this.event          = event;
    this.installationId = data.installation.id;
    this.data           = data;
  }

  private static parseGithubEvent(event: string): GithubEvent {
    switch (event) {
      // TODO: Add proper parsing for all Github events.
      default:
        return GithubEvent.PULL_REQUEST;
    }
  }

  public static parseFromHttp(request: Request) {
    const signature = request.headers['x-hub-signature'];
    if (!signature) {
      throw new HttpError('Signature not provided', 401);
    }
    const event = request.headers['x-github-event'];
    if (!event) {
      throw new HttpError('Event not provided', 401);
    }
    return new GithubRequestData(signature.toString(),
                                 GithubRequestData.parseGithubEvent(event.toString()),
                                 request.body);
  }
}
