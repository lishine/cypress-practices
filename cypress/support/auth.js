let user
let token

export const auth = () => {
	cy.request('POST', 'url', {
		email: 'a@a.com',
		password: '12345678',
	})
		.its('body')
		.then(async res => {
			;({ user, token } = res)
			window.localStorage.setItem('token', token)
			window.localStorage.setItem('user', user)
		})
}
