export interface ITodo {
    id : string
    title : string
    description : string
    userId : string
    createdAt : Date
    updatedAt: Date
    completed: boolean
    important: boolean
    taskType: string
}
