import { ApiResponse, FetchRequestOptions, UseFetchHookReturnType } from '@/interface/hooks/UseFetch.types';
import { useState } from 'react';



export const useFetch = (): UseFetchHookReturnType => {
    const [apiData, setApiData] = useState<ApiResponse>()
    const createRequest = async (options: FetchRequestOptions) => {
        const { baseUrl, method, endpoint, token, resquestData = {}, queryValue = "" } = options
        const fullEndpoint = method === 'GET' ? `${baseUrl}${endpoint}${queryValue}` : `${baseUrl}${endpoint}`;

        try {
            const response = await fetch(fullEndpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: method !== "GET" && resquestData ? JSON.stringify(resquestData) : undefined,

            })

            if(!response.ok) throw new Error('API request failed!')

            const data = await response.json()
            setApiData({success: true,data,error: undefined})

        }
        catch (error) {
            if(error instanceof Error) setApiData({success: false, data: undefined, error: error.message})
        }

    }


    return {apiData, createRequest}

}