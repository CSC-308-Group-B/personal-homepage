/// <reference types="cypress" />

let testUser, apiResponse;

describe('API Tests', () => {
    context('Getting a User', () => {
        it('GIVEN the backend is running', () => { })

        it('WHEN I visit the getUser endpoint', () => {
            cy.request(`${Cypress.env().BE_URL}/getUser`).then((response) => {
                apiResponse = response;
            });
        })

        it('THEN the repsonse is not null', () => {
            assert.isNotNull(apiResponse.body, 'THEN it gets a response');
        })

        it('AND returns a user', () => {
            assert.equal(apiResponse.body.name, 'Baba Shaniqua', 'AND returns a user');
        })

        it('AND the reponse code is 200', () => {
            assert.equal(apiResponse.status, 200, 'AND the response code is 200');
        })
    })

    context('Adding a tile to User\'s Tiles', () => {
        it('GIVEN the backend is running', () => { })
        it('AND the user is valid', () => { /*VALIDATED THROUGH PREVIOUS TEST*/ })
        it('WHEN a POST request is sent to add a tile', () => {
            cy.request("POST", `${Cypress.env().BE_URL}/u/111/tiles`, { tileType: "SearchBarTile", width: 2, x: 50, y: 8, color: { r: 100, b: 120, g: 140, a: 0.81 } }).then((response) => {
                apiResponse = response;
            });
        });

        it('THEN the repsonse is not null', () => {
            assert.isNotNull(apiResponse.body, 'THEN it gets a response');
        });

        it('AND the response code is 201 (object was created)', () => {
            assert.equal(apiResponse.status, 201, 'AND the response code is 201, object was created');
        });
    });

})


describe('E2E Tests', () => {
    before(() => {
        it('GIVEN the user is valid', () => {
            cy.request(`${Cypress.env().BE_URL}/getUser`).then((response) => {
                assert.isNotNull(apiResponse.body, 'valid repsonse');
                testUser = response.body;
            });
        });
        cy.visit(`${Cypress.env().FE_URL}`);
    });

    context('Removing  from tile to User\'s Tiles', () => {


        it('GIVEN a user is in Editmode', () => {
            cy.get('.EditModeToggler').click()
            cy.get('.canEdit').should('exist')
        });

        it('WHEN they open a tile dropdown AND click \'Delete\'', () => {
            cy.get('.TileControls').invoke('show').click({ multiple: true }).get('.show > .Danger').click();
        });

        it('THEN no tiles should exist on the page', () => {
            cy.get('.TileControls').should('not.exist');
        });
    })  

    context('Logging out of account', () => {

        it('GIVEN a user is in EditMode', () => {
            cy.get('.canEdit').should('exist')
        });

        it('WHEN they click the logout button', () => {
            cy.get('.logout').click();
            cy.clearCookies();
        });

        it('THEN they should be redirected to the homepage', () => {
            cy.get('.Logo').contains('Personal Homepage');
        });
    });

})