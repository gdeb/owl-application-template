
/**
 * We prepare here the environment for the application. The most important
 * part of an environment is an instance of QWeb with the templates.
 */

export async function makeEnvironment() {
  const TEMPLATES = await owl.utils.loadTemplates("/templates.xml");
  const qweb = new owl.QWeb(TEMPLATES);
  const env = { qweb };
  return env;
}
