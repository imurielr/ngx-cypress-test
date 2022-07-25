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

  it('then and wrap methods', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email')
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    // EVITAR REPETIR LOS LOCATORS
    cy.contains('nb-card', 'Using the Grid').then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text() // Cuando se usa el .then el metodo find no retorna un objeto cypress sino uno JQuery
      const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text() // Los elementos cypress no se pueden guardar en variables, los JQuery si

      expect(emailLabelFirst).to.equal('Email')
      expect(passwordLabelFirst).to.equal('Password')

      cy.contains('nb-card', 'Basic form').then((secondForm) => {
        const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
        expect(passwordLabelFirst).to.equal(passwordLabelSecond)

        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password') // Wrap convierte el resultado JQuery en un elemento Cypress
      })
    })
  })

  it('invoke command', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // GET THE TEXT VALUE FROM WEB PAGE:
    // 1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    // 2
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address')
    })

    // 3
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => { // Invoca la función del JQuery y lo guarda como variable
      expect(text).to.equal('Email address')
    })

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      .should('contain', 'checked')
  })

  it('assert property', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(input => {
        cy.wrap(input).click()
        cy.get('nb-calendar-day-picker').contains('17').click()
        cy.wrap(input).invoke('prop', 'value').should('contain', 'Jul 17, 2022')
      })
  })

  it('radio button', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid')
      .find('[type="radio"]')
      .then(radioButtons => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should('be.checked')

        cy.wrap(radioButtons)
          .eq(1) // Obtener valor en index 1
          .check({ force: true })

        cy.wrap(radioButtons)
          .first() // lo mismo que .eq(0)
          .should('not.be.checked')

        cy.wrap(radioButtons)
          .eq(2)
          .should('be.disabled')
      })
  })

  it.only('checkboxes', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    cy.get('[type="checkbox"]').check({ force: true }) // solo checkea, no se puede descheckear con .check()
    cy.get('[type="checkbox"]').eq(0).click({ force: true })
  })
})