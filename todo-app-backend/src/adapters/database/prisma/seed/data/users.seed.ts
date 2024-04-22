import { PasswordHash } from '../../../../../utils/passwordHash'

export const users = {
	id       : '5ad558d3-12af-4852-9243-d5f92311b06c' ,
	name     : 'David' ,
	email    : 'david@gmail.com' ,
	password : PasswordHash.hash( 'coxinha123' ) ,
}

