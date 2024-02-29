import { IRegister } from '../../interfaces/User/IRegister'
import { ITaskList } from '../../interfaces/User/ITaskList'
import { IUser } from '../../interfaces/User/IUser'

export interface IUserRepository {
    findUserByEmail( email:string ): Promise<IUser | null>;
    registerUser( registerData: IRegister ): Promise<void>
    createUserTaskList( taskData: ITaskList ): Promise<void>
    getUserTaskList( id:string ): Promise<string[]>

}
