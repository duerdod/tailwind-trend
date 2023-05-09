import './commands';

Cypress.on('window:before:load', (win) => {
  const dl = [];
  cy.spy(dl, 'push').as('gtm_dataLayer_push');
  win.dataLayer = dl;
});

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;

Cypress.on('uncaught:exception', (err) => {
  if (resizeObserverLoopErrRe.test(err.message)) {
    // returning false here prevents Cypress from
    // failing the test
    // https://github.com/quasarframework/quasar/issues/2233
    return false;
  }
});
