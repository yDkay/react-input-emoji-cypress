import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      getData(dataTest: string);
      apiTest(dataApi: number);
      bancoTest(dataDb: string);
    }
  }
}
