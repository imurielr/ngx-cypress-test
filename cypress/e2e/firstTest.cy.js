/// <reference types="cypress" />

describe('Our first suite', () => {
  it('first test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // By tag name: 
    cy.get('input')
    //By Id: 
    cy.get('#inputEmail1')
    //By class name: 
    cy.get('.input-full-width')
    //By attribute name: 
    cy.get('[placeholder]')
    //By attribute name and value: 
    cy.get('[placeholder="Email"]')
    //By class value: 
    cy.get('[class="input-full-width size-medium shape-rectangle"]')
    //By tag name and attribute with value: 
    cy.get('input[placeholder="Email"]')
    //By 2 different attributes: 
    cy.get('[placeholder="Email"][fullwidth]')
    //By tag name, attribute with value, id and class name: 
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')
    //The most recommended way by cypress (locator personalizado): 
    cy.get('[data-cy="imputEmail1"]')
  })

  it('second test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('[data-cy="signInButton"]')
    
    cy.contains('Sign in') // Fist match
    
    cy.contains('[status="warning"]', 'Sign in') // Web element con atributo status=warning

    /** 
     * Encuentra el #inputEmail3
     * se va al padre con tag name form, 
     * luego encuentra el tagname button
     * Valida si el botón contiene el texto 'Sign in'
     * se devuelve al padre form
     * busca el checkbox
     * da click en el checkbox
     */
    cy.get('#inputEmail3')
      .parents('form')
      .find('button')  // Si se usa .get encuentra todos los button del DOM, find se usa para encontrar los hijos
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

    cy.contains('nb-card', 'Horizontal form') // Encuentra el nb-card que contiene el texto Horizontal form
      .find('[type="email"]')

  })
})