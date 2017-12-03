export interface Task {
    id : number,
    dueDate : Date,
    resolvedAt : Date,
    title : string,
    description : string,
    priority : number,
    status : string
}