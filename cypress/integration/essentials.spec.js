// This file contains essential tests to ensure that the basic purchase flow is working
// Make sure to update the URLs below to pages that are relevant to your shop
const CATEGORY_PAGE = '/se/sv/nyheter';
const PRODUCT_PAGE = '/se/sv/mobler/nice-chair';

describe('Start page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });
});

describe('Category page', () => {
  it('successfully loads', () => {
    cy.visit(CATEGORY_PAGE);
  });

  it('links to products', () => {
    cy.visit(CATEGORY_PAGE);
    const url = cy.url();
    cy.findAllByTestId('product').first().click();
    cy.url().should('not.be', url);
  });
});

describe('Product page', () => {
  it('successfully loads', () => {
    cy.visit(PRODUCT_PAGE);
  });

  it('lets you add to cart', () => {
    cy.visit(PRODUCT_PAGE);
    cy.findByTestId('add-to-cart').click();
    // Cart now contains one item
    cy.findByTestId('cart-button').next().contains('1');
  });
});

describe('Cart', () => {
  it('can be successfully opened', () => {
    cy.findByTestId('cart-button').click();
  });

  it('lets you go to the checkout', () => {
    cy.visit(PRODUCT_PAGE);
    cy.findByTestId('add-to-cart').click();
    cy.findByTestId('cart-button').click();
    cy.findByTestId('checkout-button').click();
    cy.url().should('contain', '/checkout');
  });
});
