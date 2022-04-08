/// <reference types = "cypress"/>


describe('Basic Functionality', () => {

    before(()=>{
        cy.visit('http://name.am')
    })

    it('should contain logo on html header', () => {

        cy.get('img').should('be.visible').should('have.attr' , 'src', 'https://name.am/img/logo.svg')

        
    })


})
