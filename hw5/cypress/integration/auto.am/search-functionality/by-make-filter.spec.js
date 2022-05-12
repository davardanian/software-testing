/// <reference types = "cypress"/>
import {brands} from '../../../fixtures/cartypes'



// Adding this because page throws error in the console
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Search bar Functionality / Test car make filter', () => {


    beforeEach(()=>{
        cy.visit('http://auto.am')
    })

    // For each brand check that there are only their cars listed in the search results

    brands.forEach(brand => {

        it(`should return only ${brand} vehicles`, () => {

            cy.xpath(`//span[contains(text(),'Մակնիշը')]`)
            .click()
    
            cy.get('.select2-results__option')
            .contains(brand)
            .click()
    
            cy.xpath(`//button[@id='search-btn']`)
            .click()
    
            cy.get('#search-result')
                .find('div')
                .find('.card-content')
                .find('.card-title.bold')
                .each($entry =>{
                    cy.wrap($entry)
                    .should('include.text', brand)
                    
                })

            // Check if their images are visible
            cy.get('#search-result')
                .find('div')
                .find('.card-image')
                .find('img')
                .each($entry =>{
                    cy.wrap($entry)
                    .should('be.visible')
                    .and(($img) => {
                        // "naturalWidth" and "naturalHeight" are set when the image loads
                        expect($img[0].naturalWidth).to.be.greaterThan(0)
                      })
                    
                })
                
            
            
            
            
        })
        
    });

    


})