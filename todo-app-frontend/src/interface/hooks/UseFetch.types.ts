import { ILogin } from "../ILogin"
import { IRegister } from "../IRegister"
import { ICreateCategory } from "../category/ICreateCategory"
import { IDeleteCategory } from "../category/IDeleteCategory"
import { IGetCategoriesResponse } from "../category/IGetCategoriesResponse"
import { IUpdateCategory } from "../category/IUpdateCategory"
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
    data: LoginResponse | ITodo[] | IGetCategoriesResponse[] | undefined;
    error?: string | undefined;
}

export type UserEndpoint = 'user/login' | 'user/register' 
export type TodoEndpoint = 'todo/get?categoryName=' | 'todo/create' | 'todo/update/' | 'todo/delete/' 
export type CategoryEndpoint = 'category/create' | 'category/get' | 'category/update' | 'category/delete'

export type EndpoitsType = UserEndpoint | TodoEndpoint | CategoryEndpoint
export type RequestDataType = IRegister | ILogin | ICreateTodo | IGetTodo | IUpdateTodo | IDeleteTodo  | ICreateCategory | IUpdateCategory | IDeleteCategory
export type QueryValueType = string
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