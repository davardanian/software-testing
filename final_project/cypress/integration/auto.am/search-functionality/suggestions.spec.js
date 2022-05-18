/// <reference types = "cypress"/>
import {brands} from '../../../fixtures/cartypes'




// Adding this because page throws error in the console
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Search bar Functionality / Suggestions', () => {


    beforeEach(()=>{
        cy.visit('http://auto.am')
    })

    // brands.forEach(brand => {
        it(`Should include typed string in suggestions`, () => {
            cy.get('.search-master')
            .last()
            .trigger('mouseover' ,{force: true})
            .should('be.visible')
            .find('input')
            .click()
            .type('merc')

            // I couldn't manage any way to get the suggestions...
    
            cy.get('#searchDiv')
                .find('p')
                .each($entry => {
                    cy.wrap($entry)
                    const text = $entry.invoke('text')
                    expect(text.include(brand))
                })
        // })
    })
        it('Should be able to type looong characters', () => {
            cy.get('.search-master')
            .last()
            .trigger('mouseover' ,{force: true})
            .should('be.visible')
            .find('input')
            .click()
            .type('*'.repeat(100))

            cy.log(`Finally found what is wrong, they use oninput="onIn()" in their input form. The input value isn't even visible in the DOM`)
            cy.get('.search-master')
            .last()
            .trigger('mouseover' ,{force: true})
            .should('be.visible')
            .find('input')
            .contains('*')
            .invoke('text')
            .then($text =>{ 
                expect($text.length).to.be.equal(100)
            })
        })
    

    

    

    


})