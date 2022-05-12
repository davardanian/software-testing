/// <reference types = "cypress"/>




// Adding this because page throws error in the console
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Top Listings ', () => {


    beforeEach(()=>{
        cy.visit('http://auto.am')
    })

    it('Top listing header should be visible' , () =>{
        cy.get('h2')
        .contains('Թոփ հայտարարություններ')
        .should('be.visible')
    })

    it('There should be overall 5 slide pages',() => {
        cy.xpath(`//div[@id='top-slider']`)
        .should('have.attr', 'data-allslides')
        .and('match', /4|5/g)
    })

    it('Go to next page and see whether slide page number changes', () => {
        for(let i=1 ; i<=4 ; i++){
        cy.xpath(`//body/section[@id='sec-top']/div[1]/div[1]/div[1]/button[2]`).click()
        cy.xpath(`//div[@id='top-slider']`)
        .should('have.attr', 'data-currentslide')
        .and('contain', `${i}`)

        }
        

    })

    it('Try to slide the listbox', () => {
        cy.xpath(`//body/section[@id='sec-top']/div[1]/div[1]/div[1]/div[1]/div[1]`)
        .trigger('mouseover', {force: true})
        .trigger('mousedown', {force: true})
        .trigger('mousemove',  55, 0, {force: true})
        .trigger('mouseup', {force: true})
    })


    

    


})