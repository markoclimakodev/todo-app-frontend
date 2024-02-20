import { PasswordHash } from '../../../../utils/passwordHash'

export const users = [
	{
		name     : 'David' ,
		email    : 'david@gmail.com' ,
		password : PasswordHash.hash( 'coxinha123' ) ,
	} ,
	{
		name     : 'Marko' ,
		email    : 'marko@gmail.com' ,
		password : PasswordHash.hash( 'frango123' ) ,

	}
]

