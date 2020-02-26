import { Modal } from './common/modal'
import { lockedClass, unlockedClass } from './common/common'
import { createWidget } from "./common/createWidget";

const getRow = () =>
	cy
		.get('tbody')
		.find('tr')
		.first()

const openModal = () => {
	getRow()
		.find('td:nth-child(2)')
		.click()
	Modal.waitTillVisible()
}
function setChecked() {
	getRow()
		.find('td')
		.first()
		.find('input[type="checkbox"]')
		.check()
}

function getLockIcon() {
	return getRow().find('cy|lock', { timeout: 10000 })
}

function getUpdateStatusSelect() {
	return cy.get('select#updateStatusInput')
}

function unlock() {
	getLockIcon().should('have.class', lockedClass)
	setChecked()
	getUpdateStatusSelect().select('UNLOCK')
	cy.waitWhileSpinning()
	getLockIcon().should('have.class', unlockedClass)
}

function lock() {
	openModal()
	Modal.lock()
	Modal.submit()
	cy.waitWhileSpinning()
}

describe('test widget lock', function() {
	beforeEach(() => {
		cy.restoreLocalStorage()
		Cypress.Cookies.preserveOnce('cookie')
	})

	before(function() {
		cy.auth()
		cy.visit('/widget')
		cy.waitWhileSpinning()
	})

	before(function() {
		createWidget()
	})

	before(function() {
		cy.contains('Updated Date').click()
		cy.waitWhileSpinning()
	})

	afterEach(() => {
		cy.saveLocalStorage()
	})

	it('unlocked widget should not have UNLOCK action', function() {
		setChecked()
		getUpdateStatusSelect()
			.find('[value="UNLOCK"]')
			.should('not.exist')
	})

	it("should lock widget", function() {
    lock();
    getLockIcon().should("have.class", lockedClass);
  });

	it('modal: when locked, submit and add should be disabled', function() {
		openModal()
		Modal.getIsLocked().should('be.true')
		Modal.getSubmitButton().should('be.disabled')
		Modal.getAddAbButton().should('have.attr', 'disabled')
		Modal.close()
	})

	it('unlock with UNLOCK action', function() {
		unlock()
	})

	it('modal: when unlocked, submit and add should not be disabled', function() {
		openModal()
		Modal.getIsLocked().should('be.false')
		Modal.getSubmitButton().should('not.be.disabled')
		Modal.getAddAbButton().should('not.have.attr', 'disabled')
		Modal.close()
	})

	it('when adding widget lock should be disabled', function() {
		Modal.addWidget()
		Modal.getLockButton().should('have.attr', 'disabled')
	})
})
