export type APIResponse<T>={
    message:string,
    status:number,
    data:T
}

export type TodoType={
    createAt:string,
    updatedAt:string,
    activeFlag:boolean,
}
