import * as cors                  from 'cors';
import * as express               from 'express';
import * as admin                 from 'firebase-admin';
import * as functions             from 'firebase-functions';
import { URL }                    from 'url';
import { Source }                 from './models/source';
import { logger, loggerInstance } from './TSCommon/logger';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  function afterResponse() {
    res.removeListener('finish', afterResponse);
    res.removeListener('close', afterResponse);
    const log = loggerInstance.child({
      id: req.ip,
    },                               true);
    log.info({ res }, 'response');
  }

  res.on('finish', afterResponse);
  res.on('close', afterResponse);
  next();
});
app.use((req, res, next) => {
  const log = loggerInstance.child({
    id  : req.ip,
    body: req.body,
  },                               true);
  // log.info({ req });
  next();
});
app.set('view engine', 'pug');

admin.initializeApp();

// MIDDLEWARE
app.use(cors({ origin: true }));

// HANDLERS
/**
 *
 */
app.post('/webhook', async (request, response, next) => {
  try {
    const source = Source.parseSourceFromUrl(new URL(`${request.protocol}://${request.hostname}`));
    const result = await source.handleWebhook(request);
    response.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

/**
 *
 */
app.post('/install', async (request, response, next) => {
  try {
    const source = Source.parseSourceFromUrl(new URL(`${request.protocol}://${request.hostname}`));
    const result = await source.install(request);
    response.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

app.get('/install', (request, response, next) => {
  response.render('install');
});

app.use((err, req, res, next) => {
  logger.error(err);
  const status = err.status || 500;
  res.status(status).send({ status: err.status, message: err.message });
});
export let clapper = functions.https.onRequest(app);
