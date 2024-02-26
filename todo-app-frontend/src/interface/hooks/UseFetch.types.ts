import { ILogin } from "../ILogin"
import { IRegister } from "../IRegister"
import { ICreateTodo } from "../todo/ICreateTodo"
import { IDeleteTodo } from "../todo/IDeleteTodo"
import { IGetTodo } from "../todo/IGetTodo"
import { ITodo } from "../todo/ITodo"
import { IUpdateTodo } from "../todo/IUpdateTodo"


export interface LoginResponse {
    authResponse: {
        token: string
        userId: string
    }
}

export interface ApiResponse {
    success: boolean;
    data: LoginResponse | ITodo[] | undefined;
    error?: string | undefined;
}

export type EndpoitsType = 'login' | 'register' | 'todo/get?tasktype=' | 'todo/create' | 'todo/update/' | 'todo/delete/'
export type RequestDataType = IRegister | ILogin | ICreateTodo | IUpdateTodo | IDeleteTodo | IGetTodo
export type QueryValueType = 'all' | 'casa' | 'compras' | 'criativo' | 'estudos' | 'financeiro' | 'hobbies' | 'outros' | 'pessoal' | 'profissional' | 'relacionamentos' | 'saúde e bem-estar' | 'viagens'
export type MethodType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export type FetchRequestOptions = {
    baseUrl: 'http://localhost:3002/'
    method: MethodType
    endpoint: EndpoitsType
    resquestData?: RequestDataType
    token?: string
    queryValue?: QueryValueType
}


type CreateRequestFunction = (options: FetchRequestOptions) => Promise<void>;

export type UseFetchHookReturnType = {
    apiData: ApiResponse | undefined;
    createRequest: CreateRequestFunction;
};