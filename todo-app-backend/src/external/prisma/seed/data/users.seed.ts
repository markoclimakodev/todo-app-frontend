import { PasswordHash } from '../../../../utils/passwordHash'

export const users = [
	{
		id       : '5ad558d3-12af-4852-9243-d5f92311b06c' ,
		name     : 'David' ,
		email    : 'david@gmail.com' ,
		password : PasswordHash.hash( 'coxinha123' ) ,
	} ,
	{
		id       : 'ccf7af04-7c83-4e2f-8b4a-1420d2b01f5c' ,
		name     : 'Marko' ,
		email    : 'marko@gmail.com' ,
		password : PasswordHash.hash( 'frango123' ) ,
	}
]

