import { PasswordHash } from '../../../../utils/passwordHash'
const defaultCategories = [ 'todas tarefas' , 'importantes' , 'concluídas' ]

export const users = [
	{
		name      : 'David' ,
		email     : 'david@gmail.com' ,
		password  : PasswordHash.hash( 'coxinha123' ) ,
		taskLists : defaultCategories
	} ,
	{
		name      : 'Marko' ,
		email     : 'marko@gmail.com' ,
		password  : PasswordHash.hash( 'frango123' ) ,
		taskLists : defaultCategories
	}
]

