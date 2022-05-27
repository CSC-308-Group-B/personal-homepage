/// <reference types="cypress" />

describe('first api test', () => {
  before = () => {
    `${Cypress.env().BE_URL}/getUser`
  }
  context('getting a user', () => {
    it('GIVEN the backend is running', () => {})
    
    it('WHEN I visit the getUser endpoint', () => {
      cy.request(`${Cypress.env().BE_URL}/getUser`).then((response) => {
        assert.isNotNull(response.body, 'THEN it gets a response');
        assert.equal(response.body.name, 'Baba Shaniqua', 'AND returns a user');
        assert.equal(response.status, 200, 'AND the response code is 200');
    });
    })
  })
})
