interface IGetTodoQuery {
    userId: string
    completed?: boolean
    important?: boolean
    taskType?: string
}
export const generateGetQuery = ( userId: string , tasktype: string ): IGetTodoQuery => {
	let query: IGetTodoQuery

	switch ( tasktype ) {
	case 'todas tarefas':
		query = {
			userId ,
		}

		break
	case 'concluídas':
		query = {
			userId ,
			completed : true ,
		}

		break
	case 'importantes':
		query = {
			userId ,
			important : true ,
		}

		break
	default:
		query = {
			userId ,
			taskType : tasktype ,
		}

		break
	}

	return query
}
