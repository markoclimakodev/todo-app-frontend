import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import { useAuth } from "./useAuth";

export const useGetTaskList = () => {
  const { userId, token } = useAuth()
  const { apiData, createRequest, } = useFetch()
  const [taskList, setTaskList] = useState<string[]>([])
  useEffect(() => {
    const fetchTodos = async () => {
        try {
            await createRequest({
              baseUrl: 'http://localhost:3002/',
              endpoint: 'tasklist/get',
              method: 'GET',
              resquestData: {userId},
              token
            })
        } catch (error) {
            console.error("Error fetching todos:", error);
        } 
    }
    fetchTodos();
}, [createRequest, token, userId]);

useEffect(() => {
    if (apiData?.data) {
        setTaskList(apiData.data as unknown as string[]);
    }
}, [apiData?.data]);

  return {taskList}
}