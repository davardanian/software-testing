/// <reference types = "cypress"/>
import {brands} from '../../../fixtures/cartypes'



// Adding this because page throws error in the console
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Search bar Functionality / Models', () => {


    beforeEach(()=>{
        cy.visit('http://auto.am')
    })

    // For each brand check that there are only their cars listed in the search results

    

        it(`should not give results while brand is not chosen`, () => {

            cy.xpath(`//span[contains(text(),'Մոդելը')]`)
            .click()
    
            cy.get('.select2-results__option')
            .should('contain', 'անարդյունք')
    
    });

    it('should show results while brand is chosen', () => {
        cy.xpath(`//span[contains(text(),'Մակնիշը')]`)
            .click()
    
            cy.get('.select2-results__option')
            .contains('Toyota')
            .click()

            // Wait because the ui is trash
            cy.wait(500)

            cy.xpath(`//span[contains(text(),'Մոդելը')]`)
            .click()
    
            cy.get('.select2-results__option')
            .should('not.contain', 'անարդյունք')    
    })

    it('should remove model suggestions after removing brand', () => {

        cy.xpath(`//span[contains(text(),'Մակնիշը')]`)
            .click()
    
            cy.get('.select2-results__option')
            .contains('Toyota')
            .click()

            // Wait because the ui is trash
            cy.wait(500)

            cy.xpath(`//span[contains(text(),'×')]`)
            .click()

            cy.get('.select2-results__option')
            .should('contain', 'անարդյունք')

    })
    


})