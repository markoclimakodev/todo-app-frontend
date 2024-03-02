import { useState, useEffect, useCallback } from "react";
import { useFetch } from "./useFetch";
import { useAuth } from "./useAuth";

export const useGetTaskList = () => {
  const { userId, token } = useAuth()
  const { apiData, createRequest, } = useFetch()
  const [taskList, setTaskList] = useState<string[]>([])

  const fetchCategories = useCallback(async () => {
      await createRequest({
        baseUrl: 'http://localhost:3002/',
        endpoint: 'tasklist/get',
        method: 'GET',
        resquestData: {userId},
        token
      })
  }, [createRequest, token, userId])

  useEffect(() => {
    const fetchTodos = async () => {
        try {
            await fetchCategories()
        } catch (error) {
            console.error("Error fetching todos:", error);
        } 
    }
    fetchTodos();
}, [fetchCategories]);

useEffect(() => {
    if (apiData?.data) {
        setTaskList(apiData.data as unknown as string[]);
    }
}, [apiData?.data]);

  return {taskList, fetchCategories}
}