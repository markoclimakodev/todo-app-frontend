import { ApiResponse, TodoTaskParams } from "@/interface/UseToDoApi.type";
import { useState } from "react";

export const useTodoApi = (baseUrl: string) => {
    const [apiResponse, setAPiResponse] = useState<ApiResponse>()

    const todoTask = async (params: TodoTaskParams) => {
        const { endpoint, method, token, reqData } = params

        try {
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: method !== 'GET' && reqData ? JSON.stringify(reqData) : undefined,
            });

            if (!response.ok) {
                throw new Error("Erro");
            }
            const fetchedData = await response.json();
            const apiData: ApiResponse = { success: true, data: fetchedData, error: undefined }
            setAPiResponse(apiData)
        } catch (error) {
            if (error instanceof Error) {
                return { success: false, data: undefined, error: error.message };
            }
        }
    };

    return { apiResponse, todoTask }
}