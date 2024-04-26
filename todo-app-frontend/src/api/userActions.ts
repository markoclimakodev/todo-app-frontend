import { ILogin } from "@/interface/ILogin";
import { ILoginResponse } from "@/interface/user/ILoginResponse";
import { saveAuth } from "./auth";
import { IRegister } from "@/interface/IRegister";
import { API_URL } from "./apiURL";

export async function userLogin({ email, password }: ILogin): Promise<void> {

    const response = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error("Error while trying to login in");
    }

    const data = await response.json() as ILoginResponse;
    const { token, userId } = data;

    saveAuth({ token, userId });
}

export async function userRegister({ name,email, password }: IRegister): Promise<void> {

    const response = await fetch(`${API_URL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,email, password })
    });

    if (!response.ok) {
        throw new Error("Error while trying to register");
    }
}