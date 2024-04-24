export interface ITodo {
    id : string
    title : string
    description : string
    important : boolean
    completed: boolean
    createdAt : Date
    updatedAt: Date
    category: string | null
}
