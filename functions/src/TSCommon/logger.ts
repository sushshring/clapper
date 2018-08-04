import * as bunyan from 'bunyan';

export let logger = bunyan.createLogger({
  name   : 'logger',
  streams: [
    { stream: process.stdout, level: 'info' },
    { stream: process.stderr, level: 'error' },
  ],
});
