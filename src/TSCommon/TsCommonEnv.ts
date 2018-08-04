import Env from './Env';

export default class TsCommonEnv {
  public static readonly GITHUB_APP_IDENTIFIER = Env.getEnvValue('github', 'app_identifier', '');
  public static readonly GITHUB_WEBHOOK_SECRET = Env.getEnvValue('github', 'webhook_secret', '');
  public static readonly GITHUB_PRIVATE_KEY    = Env.getEnvValue('github', 'private_key', '');
}
