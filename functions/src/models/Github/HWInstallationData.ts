import { Request }   from 'express';
import { HttpError } from '../HttpError';

export class HWInstallationData {
  installationId: string;
  hwId: string;

  constructor(installationId: string, hwId: string) {
    this.installationId = installationId;
    this.hwId           = hwId;
  }

  public static parseFromHttp(request: Request): HWInstallationData {
    const installationId = request.body.installationId;
    if (!installationId) {
      throw new HttpError('Installation ID not provided', 401);
    }
    const hwId = request.body.hwId;
    if (!hwId) {
      throw new HttpError('Hardware ID not provided', 401);
    }
    return new HWInstallationData(installationId.toString(), hwId.toString());
  }
}
