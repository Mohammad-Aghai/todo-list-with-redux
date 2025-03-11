// todoACtion creator
import { addTodoType, deleteTodoType, clearAllTodoType, statusTodoType, getAllTodoType } from "./actionType.js"
let addTodoCreator = (title) => {
    return {
        type: addTodoType,
        title
    }
}
let deleteTodoCreator = (id) => {
    return {
        type: deleteTodoType,
        id
    }
}
let clearAllTodoCreator = () => {
    return {
        type: clearAllTodoType,

    }
}
let statusTodoCreator = (id) => {
    return {
        type: statusTodoType,
        id
    }
}
let getAllTodoCreator = () => {
    return {
        type: getAllTodoType,
    }
}
export {
    addTodoCreator
    ,
    deleteTodoCreator
    ,
    clearAllTodoCreator
    ,
    statusTodoCreator
    ,
    getAllTodoCreator
}