/// <reference types = "cypress"/>


describe('Pricing Functionality', () => {
   
    before(()=>{
        cy.visit('http://name.am')
    })


    it('set the pricing currency to amd', () =>{
        cy.get('.dropdown-lang-wrapper')
        .find('li')
        // .find('i')
        .first()
        .click()
        .find('div')
        .find('span')
        .contains('֏ AMD')
        .click()
            
    })

    it('check price currency change', () => {
        cy.get('.pricing-card-header')
            .contains('Վեբ')
            .parent()
            .find('.pricing-card-price')
            .find('span')
            .invoke('text')
            .then(text=>{
                expect(text.replace(/[^0-9]/g, '')).equal('1200')
            })

    })

    it('check the tariff change monthly/yearly', () =>{
        cy.get('.pricing-card-header')
            .contains('Վեբ')
            .parent()
            .find('.pricing-card-price')
            .find('span')
            .invoke('text')
            .then(text=>{
                cy.wrap(text.replace(/[^0-9]/g, '')).as('previousPrice')
            })
        cy.get('.month-register').click()
        cy.get('@previousPrice').then(previousPrice => {
            cy.get('.pricing-card-header')
                .contains('Վեբ')
                .parent()
                .find('.pricing-card-price')
                .find('span')
                .invoke('text')
                .then(text=>{
                    expect(text.replace(/[^0-9]/g, '')).not.equal(previousPrice)
                })
    })


})
})

