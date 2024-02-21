import { IRegister } from '../interfaces/User/IRegister'
import { IUser } from '../interfaces/User/IUser'

export interface IUserRepository {
    findUserByEmail( email:string ): Promise<IUser | null>;
    registerUser( registerData: IRegister ): Promise<void>
}
