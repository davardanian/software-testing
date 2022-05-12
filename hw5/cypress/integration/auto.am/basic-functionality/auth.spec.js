/// <reference types = "cypress"/>

const Chance = require('chance')
const chance = new Chance()

const EMAIL_PATH = `//body/div[@id='custom-content']/form[@id='loginform']/div[2]/div[5]/input[1]`
const PASSWORD_PATH = `//input[@id='password']`

// Adding this because login page throws error in the console
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Auth Functionality', () => {

    beforeEach(()=>{
        cy.visit('http://auto.am/login')
    })



    it('should be able to write in forms', () => {
        cy.xpath(EMAIL_PATH)
            .type('somestring')
            .should('have.value','somestring')
        cy.xpath(PASSWORD_PATH)
            .type('somestring')
            .should('have.value','somestring')    
    })

    // it('should not validate invalid email', () => {
    //     cy.xpath(EMAIL_PATH)
    //         .type('invalidEmail')
            

    //     cy.xpath(`//button[contains(text(),'Մուտք')]`)
    //         .click()
        
    //            // Check reload
    //     it('page should not be reloaded', () => {
    //         expect(performance.getEntriesByType('navigation')[0].type).to.not.equal(
    //             'reload'
    //           );

    //     })    
            
    // })

    it('should  validate valid email', () => {
        const validEmail = chance.email()
        const validPass = chance.name()

        cy.xpath(EMAIL_PATH)
            .type(validEmail)

        cy.xpath(PASSWORD_PATH)
            .type(validPass)  

        cy.xpath(`//button[contains(text(),'Մուտք')]`)
            .click()

        cy.xpath(`//li[contains(text(),'Այս տվյալները չեն համընկնում')]`).should('be.visible')

            
            
    })
   

})
