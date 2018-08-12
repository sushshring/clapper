import * as bunyan from 'bunyan';

export let logger = bunyan.createLogger({
  name   : 'logger',
  streams: [
                                            { stream: process.stdout, level: 'info' },
                                            { stream: process.stderr, level: 'error' },
  ],
});

function reqSerializer(req) {
  return {
    method: req.method,
    url: req.url,
    headers: req.headers,
  };
}

export let loggerInstance = bunyan.createLogger({
  name       : 'transaction-notifier',
  serializers: {
    req: reqSerializer,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err,
  },
  level      : 'info',
});
