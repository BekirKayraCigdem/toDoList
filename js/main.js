const taskDOM = document.querySelector('#task')
const listDOM = document.querySelector('#list')
const buttonDOM = document.querySelector('#button')
let todo = []

let liItems = document.querySelectorAll("li")
liItems.forEach(items => {
    todo.push(items.innerHTML)
    items.innerHTML += `<button style="padding-right: 5px; padding-top:5px;" class="close">&times</button>`
})
localStorage.setItem('todo', JSON.stringify(todo))

buttonDOM.addEventListener('onclick', newElement)

function newElement (){
    if (taskDOM.value.length > 0) {
        addItem(taskDOM.value)
        alertShow("success")
    }else{
        alertShow("error")
    }
    taskDOM.value = ""
}

const addItem = (item) => {
    listDOM.innerHTML += `<li>${item}<button style="padding-right: 5px; padding-top:5px;" class="close">&times</button> </li>`
    todo.push(item)
    localStorage.setItem('todo', JSON.stringify(todo))
}

function alertShow(e="success") {
    let classClor = "success"
    if (e === "error") {
        e = "error"
        classClor = "warning"
    }
    const alertDOM = document.querySelector(`#liveToast.${e}`)
    let alert = new bootstrap.Toast(alertDOM)
    alertDOM.classList.add(`bg-${classClor}`)
    alert.show()
}

listDOM.addEventListener('click', clickEvent)
function clickEvent(e){
    if (e.target.className == 'close') {
        e.target.parentElement.remove()

        let removeTodo = ((e.target.parentElement.textContent).slice(0, -1))
        for (let i = 0; i < todo.length; i++) {
            if (todo[i] == removeTodo) {
                todo.splice(i, 1)
            }
        }
        localStorage.setItem('todo', JSON.stringify(todo))
    } 
    else {e.target.classList.toggle('checked')}
}