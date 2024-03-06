export const generateGetTodosQuery = (
	userId: string , query: string , category?: { id: string } | null ) => {
	if ( query && category ) {
		return {
			where : {
				userId ,
				TodoCategory : {
					some : {
						categoryId : category.id
					}
				}
			}
		}
	}

	return {
		where : {
			userId ,
		}
	}
}
