interface Todo {
    id: string;
    title: string;
    description: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    TodoCategory: {
        category: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }[];
}

export class TodoFormatHelper {
	static format ( todos :Todo [] ) {
		return todos.map( ( todo ) => ({
			id          : todo.id ,
			title       : todo.title ,
			description : todo.description ,
			userId      : todo.userId ,
			createdAt   : todo.createdAt ,
			updatedAt   : todo.updatedAt ,
			category    : todo.TodoCategory[0]?.category?.name || null ,
		}) )
	}
}
