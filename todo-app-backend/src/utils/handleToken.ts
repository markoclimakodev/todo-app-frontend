import { sign , verify } from 'jsonwebtoken'

type TokenPayload = {
	userId: string
}
export class handleGenerator {
	static generate ( payload: TokenPayload ): string {
		const jwtPass = process.env.JWT_PASS ?? '5cb495ed67c7a1dd661c'
		const token = sign( payload , jwtPass , {
			expiresIn : '8h'
		})

		return token
	}

	static verify ( token: string ): TokenPayload {
		const jwtPass = process.env.JWT_PASS ?? '5cb495ed67c7a1dd661c'
		const decodedToken = verify( token , jwtPass ) as TokenPayload

		return decodedToken
	}
}
