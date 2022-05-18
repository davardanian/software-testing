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

    // Generate array of prices
    const prices = [1000,2000]

    prices.forEach(price => {

        it(`should return only ${price} price or higher vehicles`, () => {

            cy.xpath(`//span[contains(text(),'Գինը, սկս.')]`)
            .click()
    
            cy.get('.select2-results__option')
            .contains(price)
            .click()
    
            cy.xpath(`//button[@id='search-btn']`)
            .click()
    
            cy.get('#search-result')
                .find('div')
                .find('.card-action')
                .find('.price')
                .each($entry =>{
                    cy.wrap($entry)
                    .find('span')
                    .invoke('text')
                    .then($num =>{ 
                        if ($num.includes('֏')) $num = Number($num.replace(/[^0-9]/g,''))/500
                        else $num = Number($num.replace(/[^0-9]/g,''))
                        expect($num).to.be.at.least(price)
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


        it(`should return only ${price} price or lower vehicles`, () => {

            cy.xpath(`//span[contains(text(),'մինչև')]`)
            .last()
            .click()
    
            cy.get('.select2-results__option')
            .contains(price)
            .click()
    
            cy.xpath(`//button[@id='search-btn']`)
            .click()
    
            cy.get('#search-result')
                .find('div')
                .find('.card-action')
                .find('.price')
                .each($entry =>{
                    cy.wrap($entry)
                    .find('span')
                    .invoke('text')
                    .then($num =>{ 
                        if ($num.includes('֏')) $num = Number($num.replace(/[^0-9]/g,''))/500
                        else $num = Number($num.replace(/[^0-9]/g,''))
                        expect($num).to.be.at.most(price)
                    })
                    
                    
                })
 
        })


        it(`should return only vehicles between ${price} and ${price+2000}`, () => {

            cy.xpath(`//span[contains(text(),'Գինը, սկս.')]`)
            .click()
    
            cy.get('.select2-results__option')
            .contains(price)
            .click()

            cy.xpath(`//span[contains(text(),'մինչև')]`)
            .last()
            .click()
    
            cy.get('.select2-results__option')
            .contains(price+2000)
            .click()
    
            cy.xpath(`//button[@id='search-btn']`)
            .click()
    
            cy.get('#search-result')
                .find('div')
                .find('.card-action')
                .find('.price')
                .each($entry =>{
                    cy.wrap($entry)
                    .find('span')
                    .invoke('text')
                    .then($num =>{ 
                        // If price is in amd, conver to usd
                        if ($num.includes('֏')) $num = Number($num.replace(/[^0-9]/g,''))/500
                        else $num = Number($num.replace(/[^0-9]/g,''))
                        expect($num).to.be.within(price,price+2000)
                    })
                    
                    
                })

        })

        
    });

    


})













