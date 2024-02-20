import { NextFunction , Request , Response } from 'express'
import ApiError from '../../helpers/ApiError/ApiError'

function errorMiddleware (
	error: Error & Partial<ApiError> ,
	_req: Request ,
	res: Response ,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_next: NextFunction ,
) {
	const statusCode = error.statusCode ?? 500
	const message = error.message || 'Internal Server Error'

	return res.status( statusCode ).json({
		message
	})
}

export default errorMiddleware
