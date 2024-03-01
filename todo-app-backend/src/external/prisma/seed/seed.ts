import { PrismaClient } from '../../../../node_modules/.prisma/client/index'
import { todos } from './data/todos.seed'
import { users } from './data/users.seed'

const prisma = new PrismaClient()

async function seeedDatabase () {
	try {
		const createUsers = await prisma.users.createMany({
			data : users
		})

		const createTodos = await prisma.todos.createMany({
			data : todos
		})

		console.log( 'Usuários cadastrados' , createUsers )

		console.log( 'Todos cadastrados' , createTodos )

		await prisma.$disconnect()
	} catch ( error ) {
		console.error( error )

		await prisma.$disconnect()

		process.exit( 1 )
	}
}

seeedDatabase()
