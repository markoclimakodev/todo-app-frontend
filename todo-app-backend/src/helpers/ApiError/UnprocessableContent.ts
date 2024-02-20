import ApiError from './ApiError'

export class UnprocessableContent extends ApiError {
	constructor ( message:string ) {
		super( message , 422 )
	}
}
