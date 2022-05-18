/// <reference types = "cypress"/>
import {brands} from '../../../fixtures/cartypes'



// Adding this because page throws error in the console
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Search bar Functionality / Test manufacture filter', () => {


    beforeEach(()=>{
        cy.visit('http://auto.am')
    })

    // Generate array of years
    const len = 3
    const years = Array(len).fill().map((element, index) => index + new Date().getFullYear()-len-2) 

    years.forEach(year => {

        it(`should return only ${year} year or higher vehicles`, () => {

            cy.xpath(`//span[contains(text(),'Տարին, սկս.')]`)
            .click()
    
            cy.get('.select2-results__option')
            .contains(year)
            .click()
    
            cy.xpath(`//button[@id='search-btn']`)
            .click()
    
            cy.get('#search-result')
                .find('div')
                .find('.card-content')
                .find('.card-title.bold')
                .each($entry =>{
                    cy.wrap($entry)
                    .find('.grey-text')
                    .invoke('text')
                    .then($num =>{ 
                        expect(Number($num)).to.be.at.least(year)
                    })
                    
                    
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


        it(`should return only ${year} year or lower vehicles`, () => {

            cy.xpath(`//span[contains(text(),'մինչև')]`)
            .first()
            .click()
    
            cy.get('.select2-results__option')
            .contains(year)
            .click()
    
            cy.xpath(`//button[@id='search-btn']`)
            .click()
    
            cy.get('#search-result')
                .find('div')
                .find('.card-content')
                .find('.card-title.bold')
                .each($entry =>{
                    cy.wrap($entry)
                    .find('.grey-text')
                    .invoke('text')
                    .then($num =>{ 
                        expect(Number($num)).to.be.at.most(year)
                    })
                    
                    
                })
 
        })


        it(`should return only vehicles between ${year} and ${year+2}`, () => {

            cy.xpath(`//span[contains(text(),'Տարին, սկս.')]`)
            .click()
    
            cy.get('.select2-results__option')
            .contains(year)
            .click()

            cy.xpath(`//span[contains(text(),'մինչև')]`)
            .first()
            .click()
    
            cy.get('.select2-results__option')
            .contains(year+2)
            .click()
    
            cy.xpath(`//button[@id='search-btn']`)
            .click()
    
            cy.get('#search-result')
                .find('div')
                .find('.card-content')
                .find('.card-title.bold')
                .each($entry =>{
                    cy.wrap($entry)
                    .find('.grey-text')
                    .invoke('text')
                    .then($num =>{ 
                        expect(Number($num)).to.be.within(year,year+2)
                    })
                    
                    
                })

        })

        
    });

    


})