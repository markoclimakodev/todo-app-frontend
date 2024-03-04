/* eslint-disable max-lines-per-function */
import { ITodo } from '../../../core/interfaces/Todo/ITodo'

interface UpdateQuery {
	where: {
		id: string
	} ,
	data: Partial<ITodo>
}

interface UpdateQueryParams {
	id: string , updateType: string , data: Partial<ITodo>
}
export const updateTodosQueryHelper = ({ id , data , updateType }: UpdateQueryParams ): UpdateQuery => {
	const { title , description , taskType } = data
	let query: UpdateQuery

	switch ( updateType ) {
	case 'concluídas':
		query = {
			where : {
				id
			} ,
			data : {
				completed : true
			} ,
		}

		break
	case 'importantes':
		query = {
			where : {
				id
			} ,
			data : {
				important : true
			} ,
		}

		break
	default:
		query = {
			where : {
				id
			} ,
			data : {
				title ,
				description ,
				taskType
			} ,
		}

		break
	}

	return query
}
