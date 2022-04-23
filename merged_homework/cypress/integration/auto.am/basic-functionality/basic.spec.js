/// <reference types = "cypress"/>



// Adding this because page throws error in the console
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Basic Functionality', () => {

    before(()=>{
        cy.visit('http://auto.am')
    })

    it('should contain logo on html header', () => {

        cy.get('div')
        .find('#header-logo')
        .should('be.visible')

        
    })


})
