import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import errorMiddleware from './adapters/middlewares/ErrorHandlerMiddleware'
import router from './adapters/routes'

class App {
	public app: express.Express

	constructor () {
		this.app = express()

		this.config()

		this.routes()

		this.app.use( errorMiddleware )
	}

	private routes ():void {
		this.app.use( router )
	}

	private config (): void {
		const accessControl: express.RequestHandler = ( _req , res , next ) => {
			res.header( 'Access-Control-Allow-Origin' , '*' )

			res.header( 'Access-Control-Allow-Methods' , 'GET,POST,DELETE,OPTIONS,PUT,PATCH' )

			res.header( 'Access-Control-Allow-Headers' , '*' )

			next()
		}

		this.app.use( express.json() )

		this.app.use( cors() )

		this.app.use( accessControl )
	}

	public start ( PORT: string | number ): void {
		this.app.listen( PORT , () => console.log( `Running on port ${PORT}` ) )
	}
}

export { App }

export const { app } = new App()
