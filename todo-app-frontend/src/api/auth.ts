export const getAuthData = (): { token: string; userId: string } => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    let token = ''
    let userId = ''
    if (storedToken && storedUserId) {
        token = storedToken,
            userId = storedUserId
    }

    return { token, userId };
}

type SaveAuth = {
    token: string
    userId: string
}
export const saveAuth = ({ token, userId }: SaveAuth): void => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
}

export const clearAuth = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
}

export const auth = () => {
    const { token, userId } = getAuthData();
    return { token: token || '', userId: userId || '', saveAuth, clearAuth };
}
