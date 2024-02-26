export interface UseAuthReturnType  {
    token: string,            
    userId: string,          
    saveAuth: (newToken: string, newUserID: string) => void,  
    clearAuth: () => void     
}