import { compareSync , hashSync } from 'bcrypt'

export class PasswordHash {
	static hash ( password: string ) {
		return hashSync( password , 10 )
	}

	static async compare ( password: string , hashedPassword: string ): Promise<boolean> {
		return compareSync( password , hashedPassword )
	}
}
