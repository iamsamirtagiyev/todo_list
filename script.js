const body = document.querySelector('body')
const modal = document.querySelector('.modal')
const myName = modal.querySelector('input')
const myNameTitle = document.querySelector('.name')
const wrapper = document.querySelector('.wrapper')
const todoList = document.querySelector('.todo-list')
const addTodo = document.querySelector('.add-todo')
const addInput = addTodo.querySelector('.add-todo input')
const addBtn = addTodo.querySelector('.add-todo button')

let todos = []



window.onload = () => {
    if (localStorage.getItem('name') == null) {
        modal.classList.add('open')
        body.style.backdropFilter = 'blur(20px)'
    }
    else {
        myNameTitle.textContent = `${localStorage.getItem('name')}'s To Do List`
        wrapper.classList.add('open')
        body.style.backdropFilter = 'blur(0)'
    }
}

document.onkeyup = (e) => {
    if (e.key == 'Enter') {
        if (myName.value != '') {
            modal.classList.remove('open')
            body.style.backdropFilter = 'blur(0)'
            myNameTitle.textContent = `${myName.value}'s To Do List`
            localStorage.setItem('name', myName.value)
            wrapper.classList.add('open')
        }
    }
}

const create = (text) => {
    if (addInput.value != '') {
        let list = document.createElement('div')
        list.className = 'list'
        let todo = document.createElement('input')
        todo.type = 'text'
        todo.className = 'todo'
        todo.value = text
        todo.readOnly = true
        let buttons = document.createElement('div')
        buttons.className = 'buttons'
        let editBtn = document.createElement('i')
        editBtn.className = 'bi bi-pencil-square'
        let deleteBtn = document.createElement('i')
        deleteBtn.className = 'bi bi-trash3'

        list.append(todo)
        buttons.append(editBtn)
        buttons.append(deleteBtn)
        list.append(buttons)
        todoList.append(list)

        todos.push(text)
        
        addInput.value = ''


        editBtn.addEventListener('click', ()=>{
            todo.readOnly = false
        })
        list.addEventListener('keypress', (e)=>{
            if(e.key == 'Enter'){
                todo.readOnly = true
            }
        })
        deleteBtn.addEventListener('click', ()=>{
            list.remove()
        })
    }
    else{
        errorMessage.classList.add('active')

        setTimeout(() => {
            errorMessage.classList.remove('active')
        }, 3000);
    }
}



addBtn.addEventListener('click', create(addInput.value.trim()))

addTodo.addEventListener('keypress', (e)=>{
    if(e.key == 'Enter'){
        create(addInput.value.trim())
    }
    else{
        //error
    }
})