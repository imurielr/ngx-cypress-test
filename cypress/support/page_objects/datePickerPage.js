function selectDayFromCurrent(days) {
  let date = new Date()
  date.setDate(date.getDate() + days)
  let futureDay = date.getDate()
  let futureMonth = date.toLocaleString('en-US', { month: 'short' })
  let dateAssert = `${futureMonth} ${futureDay}, ${date.getFullYear()}`

  cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
    if (!dateAttribute.includes(futureMonth)) {
      cy.get('[data-name="chevron-right"').click()
      selectDayFromCurrent(days)
    } else {
      cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
    }
  })

  return dateAssert
}

export class DatePickerPage {

  selectCommonDatepickerDateFromToday(dayFromToday) {
    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(input => {
        cy.wrap(input).click()
        let dateAssert = selectDayFromCurrent(dayFromToday)

        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert) // HACEN LO MISMO
        cy.wrap(input).should('have.value', dateAssert) // HACEN LO MISMO
      })
  }

  selectDatepickerWithRangeFromToday(firstDay, secondDay) {
    cy.contains('nb-card', 'Datepicker With Range')
    .find('input')
    .then(input => {
      cy.wrap(input).click()
      let dateAssertFirst = selectDayFromCurrent(firstDay)
      let dateAssertSecond = selectDayFromCurrent(secondDay)

      const finalDate = `${dateAssertFirst} - ${dateAssertSecond}`

      cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
    })
  }

}

export const onDatePickerPage = new DatePickerPage()