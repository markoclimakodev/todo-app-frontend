import { PrismaClient } from '../../../../node_modules/.prisma/client/index'
import { users } from './data/users.seed'

const prisma = new PrismaClient()

async function seeedDatabase () {
	try {
		const createUsers = await prisma.users.createMany({
			data : users
		})

		console.log( 'Usuários cadastrados' , createUsers )

		await prisma.$disconnect()
	} catch ( error ) {
		console.error( error )

		await prisma.$disconnect()

		process.exit( 1 )
	}
}

seeedDatabase()
