import { IUser } from '../interfaces/User/IUser'

export interface IUserRepository {
    findUserByEmail( email:string ): Promise<IUser | null>;
}
