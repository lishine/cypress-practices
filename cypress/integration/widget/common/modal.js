import { lockedClass } from './common'

export const Modal = {
	addWidget() {
		cy.get('#addEntityButton').click()
		Modal.waitTillVisible()
	},
	waitTillVisible() {
		cy.get('.modal-header').should('be.visible', { timeout: 10000 })
	},
	getIsLocked() {
		return Modal.getLockButton()
			.find('i')
			.then($i => $i.hasClass(lockedClass))
	},

	getLockButton() {
		return cy.get('.modal cy|lock')
	},
	lock() {
		Modal.getLockButton().click()
	},
	getSubmitButton() {
		return cy.get('#saveModalButton')
	},
	submit() {
		Modal.getSubmitButton().click()
	},
	close() {
		cy.get('#resetModalButton').click()
	},
	getAddAbButton() {
		return cy.get('#addTestVariant')
	},
}
