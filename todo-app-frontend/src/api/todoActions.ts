import { ITodo } from "@/interface/todo/ITodo";
import { auth } from "./auth";
import { ICreateTodo } from "@/interface/todo/ICreateTodo";

const {token,userId} = auth()

export async function createTodo({title,description,category}: ICreateTodo): Promise<void> {
    const response = await fetch('http://localhost:3002/todo/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, title, description, category }),
    });

    if (!response.ok) {
        throw new Error("Error creating todo");
    }
}

export async function getTodos( search: string, ): Promise<ITodo[]> {
    const searchValue = search === 'todas' ? '' : search
    const response = await fetch(`http://localhost:3002/todo/get?category=${searchValue}`, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching todos');
    }

    const data = await response.json();
    return data as ITodo[];
}

export async function getImportantsTodos(): Promise<ITodo[]> {
    const response = await fetch(`http://localhost:3002/todo?important=true`, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching todos');
    }

    const data = await response.json();
    return data as ITodo[];
}

type UpdateTodo = {
    id: string,
    title: string,
    description: string,
    category: string,
}
export async function updateTodo({id,title,description,category}:UpdateTodo): Promise<void> {
    const response = await fetch('http://localhost:3002/todo/update', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, title, description, category }),
    });

    if (!response.ok) {
        throw new Error("Error updating todo");
    }
}

export type AddImportant = {
    id: string,
    important: boolean
}

export async function addImportant({id, important}: AddImportant): Promise<void> {
    const response = await fetch('http://localhost:3002/todo/important', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, important }),
    });

    if (!response.ok) {
        throw new Error("Error updating todo");
    }
}


export async function deleteTodo(id: string, ): Promise<void> {
    const response = await fetch('http://localhost:3002/todo/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
    });

    if (!response.ok) {
        throw new Error('Error deleting todo');
    }
}

