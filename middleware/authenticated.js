export default function({ store, error }) {
	if(!store.getters['account/isUserAuth'])
		error({
			needsAuth: true,
			statusCode: 403
		})
}