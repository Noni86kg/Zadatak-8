const addBtns = document.querySelectorAll('.AddItem-Btn')
const saveBtns = document.querySelectorAll('.SaveItem-Btn')
const allLiList = document.querySelectorAll('.li-list')
const backlogLi = document.querySelector('.backlog .li-list')
const inProgressLi = document.querySelector('.in-progress .li-list')
const completeLi = document.querySelector('.complete .li-list')
const onHoldLi = document.querySelector('.on-hold .li-list')

addBtns.forEach((addBtn) => {
    addBtn.addEventListener('click', (e) => {
        const Textarea = e.target.parentElement.nextElementSibling
        Textarea.classList.toggle('active')
    })
})

let backlogArr = []
let inProgressArr = []
let completeArr = []
let onHoldArr = []

function loadLocalData() {
    backlogArr.forEach((arr) => {
        const listEl = document.createElement('li')
        listEl.textContent = arr
        listEl.draggable = true
        listEl.setAttribute('ondragstart', 'drag(event)')
        backlogLi.appendChild(listEl)
    })
    inProgressArr.forEach((arr) => {
        const listEl = document.createElement('li')
        listEl.textContent = arr
        listEl.draggable = true
        listEl.setAttribute('ondragstart', 'drag(event)')
        inProgressLi.appendChild(listEl)
    })
    completeArr.forEach((arr) => {
        const listEl = document.createElement('li')
        listEl.textContent = arr
        listEl.draggable = true
        listEl.setAttribute('ondragstart', 'drag(event)')
        completeLi.appendChild(listEl)
    })
    onHoldArr.forEach((arr) => {
        const listEl = document.createElement('li')
        listEl.textContent = arr
        listEl.draggable = true
        listEl.setAttribute('ondragstart', 'drag(event)')
        onHoldLi.appendChild(listEl)
    })
}

window.onload = () => {
    if (localStorage.getItem('backlog')) {
        backlogArr = localStorage.getItem("backlog").split(",")
    }
    if (localStorage.getItem('in-progress')) {
        inProgressArr = localStorage.getItem("in-progress").split(",")
    }
    if (localStorage.getItem('complete')) {
        completeArr = localStorage.getItem("complete").split(",")
    }
    if (localStorage.getItem('on-hold')) {
        onHoldArr = localStorage.getItem("on-hold").split(",")
    }
    loadLocalData()
}

let draggedItem;
let currentColumn;

function drag(e) {
    draggedItem = e.target;
    dragging = true;
  }

function allowDrop(e) {
  e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const parent = allLiList[currentColumn]
    parent.appendChild(draggedItem);
    dragging = false;
    rebuildArrays();
}

function dragEnter(column) {
    currentColumn = column;
  }

function rebuildArrays() {
    backlogArr = []
    for (let i = 0; i < backlogLi.children.length; i++) {
        backlogArr.push(backlogLi.children[i].textContent);
      }
      localStorage.setItem('backlog', backlogArr)

      inProgressArr = []
    for (let i = 0; i < inProgressLi.children.length; i++) {
        inProgressArr.push(inProgressLi.children[i].textContent);
        }
        localStorage.setItem('in-progress', inProgressArr)

        completeArr = []
    for (let i = 0; i < completeLi.children.length; i++) {
        completeArr.push(completeLi.children[i].textContent);
        }
        localStorage.setItem('complete', completeArr)

        onHoldArr = []
    for (let i = 0; i < onHoldLi.children.length; i++) {
        onHoldArr.push(onHoldLi.children[i].textContent);
        }
        localStorage.setItem('on-hold', onHoldArr)
}

// Save items
saveBtns.forEach((saveBtn) => {
    saveBtn.addEventListener('click', (e) => {
        const addItemText = e.target.parentElement.nextElementSibling.children[0].value
        if(addItemText.trim() !== "") {
        const sectionClass = e.target.closest('section')
        const ul = sectionClass.children[1]
        const listEl = document.createElement('li')
        listEl.textContent = addItemText
        listEl.draggable = true
        listEl.setAttribute('ondragstart', 'drag(event)')
        ul.appendChild(listEl)
        e.target.parentElement.nextElementSibling.children[0].value = "";
        const Textarea = e.target.parentElement.nextElementSibling
        Textarea.classList.remove('active')

        if (sectionClass.classList.contains('backlog')) {
            backlogArr.push(addItemText)
            localStorage.setItem('backlog', backlogArr)
        } else if (sectionClass.classList.contains('in-progress')) {
            inProgressArr.push(addItemText)
            localStorage.setItem('in-progress', inProgressArr)
        } else if (sectionClass.classList.contains('complete')) {
            completeArr.push(addItemText)
            localStorage.setItem('complete', completeArr)
        } else if (sectionClass.classList.contains('on-hold')) {
            onHoldArr.push(addItemText)
            localStorage.setItem('on-hold', onHoldArr)
        } 
    }
    })
})