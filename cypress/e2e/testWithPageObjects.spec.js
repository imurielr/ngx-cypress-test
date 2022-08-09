import { onDatePickerPage } from "../support/page_objects/datePickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test with Page Objects', () => {
  beforeEach('Open application', () => {
    cy.openHomePage() // Custom Command
  })

  it('verify navigation across the pages', () => {
    navigateTo.formLayoutsPage()
    navigateTo.datePickerPage()
    navigateTo.smartTablePage()
    navigateTo.toasterPage()
    navigateTo.tooltipPage()
  })

  it('should submit inline and basic form and select tomorrow date in the calendar', () => {
    navigateTo.formLayoutsPage()
    onFormLayoutsPage.submitInlineFormWithNameAndEmail('Isabela', 'test@test.com')
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password')
    
    navigateTo.datePickerPage()
    onDatePickerPage.selectCommonDatepickerDateFromToday(1)
    onDatePickerPage.selectDatepickerWithRangeFromToday(1, 5)

    navigateTo.smartTablePage()
    onSmartTablePage.addNewRecordWithFirstAndLastName('Isabela', 'Muriel')
    onSmartTablePage.updateAgeByFirstName('Isabela', '23')
    onSmartTablePage.deleteRowByIndex(1)
  })

})