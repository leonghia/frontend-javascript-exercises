import { Todo } from "./todo.mjs";
import { TYPE } from "./type.mjs";

export const defaultTodos = [
    new Todo("Release the course", TYPE.backlog),
    new Todo("Sit back and relax", TYPE.backlog),
    new Todo("Work on projects", TYPE["in-progress"]),
    new Todo("Listen to music", TYPE["in-progress"]),
    new Todo("Being cool", TYPE.complete),
    new Todo("Getting stuff done", TYPE.complete),
    new Todo("Being uncool", TYPE["on-hold"])
]