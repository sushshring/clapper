import * as crypto from 'crypto';

export class Crypto {
  private static sign(data, secret) {
    return `sha1=${crypto.createHmac('sha1', secret)
      .update(Buffer.from(JSON.stringify(data)))
      .digest('hex')}`;
  }

  public static verify (signature, data, secret) {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(Crypto.sign(data, secret)));
  }
}
