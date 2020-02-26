import { createWidget } from './common/createWidget'

describe('test widget lock', function() {
	before(function() {
		cy.auth()
		cy.visit('/widget')
		cy.waitWhileSpinning()
	})

	it('create widget', function() {
		createWidget()
	})
})
