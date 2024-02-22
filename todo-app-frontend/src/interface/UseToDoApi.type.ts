import { ICreateTodo } from "./ICreateTodo"
import { ILogin } from "./ILogin"
import { IRegister } from "./IRegister"
import { Todo } from "./ITodo"

export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
export type ReqData = IRegister | ILogin | ICreateTodo
export type QueryOptions = 'completed' | ''
export type TodoTaskParams = {
    endpoint: string,
    method: Method,
    token?: string
    reqData?: ReqData
}

export interface LoginResponse {
    authResponse: {
        token: string
        userId: string
    }
}

export interface ApiResponse {
    success: boolean;
    data: LoginResponse | Todo[];
    error?: string | undefined;
}
