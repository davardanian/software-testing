/// <reference types = "cypress"/>

const Chance = require('chance')
const chance = new Chance()

describe('Auth Functionality', () => {

    beforeEach(()=>{
        cy.visit('http://name.am/login')
    })

    it('should be able to write in forms', () => {
        cy.get('input')
            .first()
            .type('somestring')
            .should('have.value','somestring')
        cy.get('input')
            .last()
            .type('somestring')
            .should('have.value','somestring')    


        
    })

    it('should not validate invalid email', () => {
        const validEmail = chance.email()

        cy.get('input')
            .first()
            .type('invalidEmail')
            

        cy.get('button')
            .contains('Մուտք')
            .click()
        
            cy.get('input')
            .first()
            .should('have.css', 'border-color')
            .and('equal', 'rgb(220, 53, 69)')
    })

    it('should  validate valid email', () => {
        const validEmail = chance.email()

        cy.get('input')
            .first()
            .type(validEmail)
            

        cy.get('button')
            .contains('Մուտք')
            .click()
        
            cy.get('input')
            .first()
            .should('have.css', 'border-color')
            .and('equal', 'rgb(206, 212, 218)')
    })
   

})
