// Imports
import { Todo } from "./todo.mjs";
import { defaultTodos } from "./todo-configuration.mjs";

// DOM selectors
const columns = Array.from(document.querySelectorAll(".drag-column"));
const dragList = document.querySelector(".drag-list");
const dragItemLists = Array.from(document.querySelectorAll(".drag-item-list"));
// States and rules
const state = {
    todos: [new Todo()],
    counter: 0
};

// Function expressions
const loadTodos = () => {
    if (!localStorage.getItem("todos")) {
        state.todos = defaultTodos;
        setIdForTodos(state.todos);
    } else {
        state.todos = JSON.parse(localStorage.getItem("todos"));
        state.counter = findMax(state.todos).id;
    }
}

const findMax = (todos = [new Todo()]) =>  todos.reduce((pV, cV) => pV.id < cV.id ? cV : pV, todos[0]);

const saveTodos = () => localStorage.setItem("todos", JSON.stringify(state.todos));

const setIdForTodos = (todos = [new Todo()]) => {
    todos.forEach(todo => todo.id = ++state.counter);
}

const populateTodos = (todos = [new Todo()]) => {
    columns.forEach(col => {
        const type = col.dataset.type;
        const todosByType = todos.filter(todo => todo.type === type);
        const dragItemList = col.querySelector(".drag-item-list");
        dragItemList.innerHTML = "";
        const markup = todosByType.reduce((previousValue, currentValue, currentIndex) => {
            return previousValue + `
            <li class="drag-item flex items-center justify-between" draggable="true" id="todo-${currentValue.id}">
                <div class="todo-name" contenteditable="true">${currentValue.name}</div>
                <div>
                    <button type="button" class="delete-btn">Delete</button>
                </div>
            </li>          
            `;
        }, "");
        dragItemList.innerHTML = markup;
    });
}

const init = () => {
    loadTodos();
    populateTodos(state.todos);
}

const deleteTodo = (event = new Event()) => {
    const clicked = event.target.closest(".delete-btn");
    const id = Number(clicked.closest(".drag-item").id.split("-")[1]);
    state.todos.splice(state.todos.findIndex(todo => todo.id === id), 1);
    saveTodos();
    populateTodos(state.todos);
}

const updateTodo = (dragItem = new HTMLElement(), dragItemListTo = new HTMLElement()) => {
    const id = Number(dragItem.id.split("-")[1]);
    const result = state.todos.find(todo => todo.id === id);
    const newType = dragItemListTo.closest(".drag-column").dataset.type;
    result.type = newType;
    saveTodos();
}

const showAddItem = (event = new Event()) => {
    const clicked = event.target.closest(".add-btn");
    clicked.classList.toggle("invisible");
    clicked.parentElement.querySelector(".save-btn").classList.toggle("hidden");
    clicked.parentElement.parentElement.querySelector(".add-container").classList.toggle("hidden");
    clicked.parentElement.parentElement.querySelector(".add-container").classList.toggle("flex");
}

const hideAddItem = (event = new Event()) => {
    const clicked = event.target.closest(".save-btn");
    clicked.classList.toggle("hidden");
    clicked.parentElement.querySelector(".add-btn").classList.toggle("invisible");
    clicked.parentElement.parentElement.querySelector(".add-container").classList.toggle("hidden");
    clicked.parentElement.parentElement.querySelector(".add-container").classList.toggle("flex");
}

const saveTodo = (event = new Event()) => {
    const clicked = event.target.closest(".save-btn");
    const addContainer = clicked.parentElement.parentElement.querySelector(".add-container");
    const addItemElement = addContainer.querySelector(".add-item");
    if (addItemElement.textContent.trim() === "") return;
    const type = clicked.closest(".drag-column").dataset.type;
    const todo = new Todo(addItemElement.textContent, type);
    todo.id = ++state.counter;
    state.todos.push(todo);
    saveTodos();
    populateTodos(state.todos);
    hideAddItem(event);
}

// Event listeners
dragList.addEventListener("dragstart", event => {
    const dragged = event.target.closest(".drag-item");
    if (!dragged) return;
    event.dataTransfer.setData("dragItemId", dragged.id);
    event.dataTransfer.setData("dragItemListId", dragged.parentElement.id);
});

dragItemLists.forEach(dragItemList => {
    dragItemList.addEventListener("dragover", event => {
        event.preventDefault();
        event.currentTarget.classList.add("over");
    });
    dragItemList.addEventListener("drop", event => {
        event.preventDefault();
        const dragItem = document.querySelector(`#${event.dataTransfer.getData("dragItemId")}`);
        const dragItemListTo = event.currentTarget;
        dragItemListTo.classList.remove("over");
        const dragItemListFrom = document.querySelector(`#${event.dataTransfer.getData("dragItemListId")}`);
        dragItemListFrom.classList.remove("over");
        updateTodo(dragItem, dragItemListTo);
        populateTodos(state.todos);
    });
});

dragList.addEventListener("click", event => {
    if (event.target.closest(".add-btn")) showAddItem(event);
    else if (event.target.closest(".save-btn")) saveTodo(event);
    else if (event.target.closest(".delete-btn")) deleteTodo(event);
});

dragList.addEventListener("focusout", event => {
    const focusOuted = event.target.closest(".todo-name");
    if (!focusOuted) return;
    const id = Number(focusOuted.parentElement.id.split("-")[1]);
    const newName = focusOuted.textContent;
    const result = state.todos.find(todo => todo.id === id);
    result.name = newName;
    saveTodos();
    populateTodos(state.todos);
})

// On load
init();