import { NextFunction , Request , Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UnauthorizedError } from '../../helpers/ApiError/UnauthorizedError'

const TOKEN_NOT_FOUND = 'Token não encontrado'
const INVALID_TOKEN = 'Token inválido'

export class AuthenticationMiddleware {
	static async authenticateToken ( req: Request , _res: Response , next: NextFunction ) {
		const { authorization } = req.headers

		if ( !authorization ) throw new UnauthorizedError( TOKEN_NOT_FOUND )

		const [ bearer , token ] = authorization.split( ' ' )

		if ( bearer !== 'Bearer' || !token ) throw new UnauthorizedError( INVALID_TOKEN )

		try {
			const user = verify( token , process.env.JWT_PASS ?? '5cb495ed67c7a1dd661c' )

			if ( !user ) throw new UnauthorizedError( INVALID_TOKEN )

			if ( req.method === 'GET' ) {
				req.body = user
			}

			next()
		} catch ( error ) {
			throw new UnauthorizedError( INVALID_TOKEN )
		}
	}
}
