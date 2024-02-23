import { ICreateTodo } from "./ICreateTodo"
import { ILogin } from "./ILogin"
import { IRegister } from "./IRegister"
import { ITodo } from "./ITodo"
import { IUpdateTodo } from "./IUpdateTodo"

export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
export type ReqData = IRegister | ILogin | ICreateTodo | IUpdateTodo
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
    data: LoginResponse | ITodo[];
    error?: string | undefined;
}
