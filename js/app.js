window.todoDeleteHandler = todoDeleteHandler
window.todoStatusHandler = todoStatusHandler
// todoList logic
import { addTodoType, deleteTodoType, clearAllTodoType, statusTodoType, getAllTodoType } from "./redux/actionType.js"
import {
    addTodoCreator,
    deleteTodoCreator,
    clearAllTodoCreator,
    statusTodoCreator,
    getAllTodoCreator
} from "./redux/actionsCreator.js"

let mainInputElm = document.querySelector(".mainInput")
let selectorElm = document.querySelector(".selector")
let addNewTodoBtn = document.querySelector(".addNewTodo")
let clearBtn = document.querySelector(".clear")
let todoListElm = document.querySelector(".todoList")
let todoItem = document.querySelector(".todo")


let colors = [
    "ff0101",
    "ff01b7",
    "7300ff",
    "00d9ff",
    "00ff88",
    "5eff00f6",
    "ff00ffe3",
    "02c8ffd7",
    "d000ffef",
    "ffb006"
]


const todoListReducer = (state = [], action) => {
    switch (action.type) {
        case addTodoType: {
            let newState = [...state]
            let newTodo = {
                id: crypto.randomUUID(),
                title: action.title,
                isComplete: false
            }
            newState.push(newTodo)
            return newState
        }
        case deleteTodoType: {
            let newState = [...state]
            let todoID = action.id
            let finalTodos = newState.filter((todo) => {
                return todo.id !== todoID
            })
            return finalTodos
        }
        case clearAllTodoType: {
            let newState = [...state]
            newState = []
            return newState
        }
        case statusTodoType: {
            let newState = [...state]
            newState.some((todo) => {
                if (todo.id === action.id) {
                    todo.isComplete = !todo.isComplete
                }
            })
            return newState
        }
        case getAllTodoType: {
            let newState = [...state]
            return newState
        }
        default: {
            return state
        }

    }
}

const store = Redux.createStore(todoListReducer)
addNewTodoBtn.addEventListener("click", () => {
    let inputValue = mainInputElm.value.trim();
    if (inputValue !== "") {
        store.dispatch(addTodoCreator(inputValue))
        let todosArray = store.getState()
        generateTodos(todosArray)
    }

})

clearBtn.addEventListener("click", () => {
    store.dispatch(clearAllTodoCreator())
    generateTodos(store.getState())
})

selectorElm.addEventListener("change", (event) => {
    let filter = event.target.value
    store.dispatch(getAllTodoCreator())
    let allTodos = store.getState();
    if (filter === "All") {
        generateTodos(allTodos)
    } else if (filter === "Completed") {
        let completeTodos = allTodos.filter((todo) => {
            return todo.isComplete === true
        })
        generateTodos(completeTodos)
    } else if (filter === "Active") {
        let activeTodos = allTodos.filter((todo) => {
            return todo.isComplete === false
        })
        generateTodos(activeTodos)
    }
})

function todoDeleteHandler(id) {
    store.dispatch(deleteTodoCreator(id))
    let todosArray = store.getState()
    generateTodos(todosArray)
}

function todoStatusHandler(id) {
    store.dispatch(statusTodoCreator(id))
    let newTodoArray = store.getState()
    generateTodos(newTodoArray)
}


function generateTodos(todosArray) {
    mainInputElm.value = ""
    todoListElm.innerHTML = ""
    todosArray.forEach((todo) => {
        todoListElm.insertAdjacentHTML("beforeend",
            ` 
            <div class="todo  ${todo.isComplete && "completeTodo"}" style="background-color: #${colors[Math.floor(Math.random() * 10)]}">
            <p class="todoText">${todo.title}</p> <button class="btn_delete btn" onClick = todoDeleteHandler("${todo.id}") >delete</button>
             <button class="btn_status btn" onClick = todoStatusHandler("${todo.id}")>${todo.isComplete ? "done" : "active"}</button>
        </div>`
        )
    })
}
