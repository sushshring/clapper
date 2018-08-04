import * as cors      from 'cors';
import * as express   from 'express';
import * as admin     from 'firebase-admin';
import * as functions from 'firebase-functions';
import { URL }        from 'url';
import { Source }     from './models/source';
import { logger }     from './TSCommon/logger';

const app = express();
app.use(express.json());
app.set('view engine', 'pug');

admin.initializeApp();

// MIDDLEWARE
app.use(cors({ origin: true }));

// HANDLERS
app.post('/webhook', async (request, response, next) => {
  const source = Source.parseSourceFromUrl(new URL(`${request.protocol}://${request.hostname}`));
  try {
    const result = await source.handleWebhook(request);
    response.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

app.post('/install', async (request, response, next) => {
  const source = Source.parseSourceFromUrl(new URL(request.url));
  try {
    const result = await source.installWebhook(request);
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
  res.status(status).send(err);
});
export let clapper = functions.https.onRequest(app);
