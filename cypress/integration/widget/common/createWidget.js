import { Modal } from './modal'

export const createWidget = () => {
	const randomNumber = +new Date()
	cy.get('#addEntityButton').click()
	cy.get('input[name="name"]').type(`test widget ${randomNumber}`)
	cy.get('#asyncSelector').within(() => {
		cy.get('input[aria-hidden!="true"]').type('xxx')
		cy.get('mark')
			.contains('xxx')
			.click()
	})
	cy.get('input[name=alias]').type(`test alias ${randomNumber}`)

	cy.get('#mn').click()
	cy.get('cy|defaultTags').within(() => {
		for (let i = 1; i <= 4; i += 1) {
			cy.get(`tr:nth-child(${i}) td:first-child`)
				.click()
				.type(i)
		}
		cy.root().click()
	})

	Modal.getSubmitButton().click()
	cy.get('#confirmationModalButton').click()
	cy.waitWhileSpinning()
}
