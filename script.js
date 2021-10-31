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

let noni = {
    backlogArr: [],
    inProgressArr: [],
    completeArr: [],
    onHoldArr: [],
    allArray: [],
    allArrayNames: ['backlogArr', 'inProgressArr', 'completeArr', 'onHoldArr'],
    allLiNames: ['backlog', 'in-progress', 'complete', 'on-hold'],
    loadLocalData: function () {
        for (let i=0; i<noni.allArrayNames.length; i++) {
            let allName = noni.allArray[i]
            allName.forEach((arr) => {
                const listEl = document.createElement('li')
                listEl.textContent = arr
                listEl.draggable = true
                listEl.setAttribute('ondragstart', 'drag(event)')
                allLiList[i].appendChild(listEl)
            })
        }
    },

    saveBtnClick: function(e) {
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
                noni.backlogArr.push(addItemText)
                localStorage.setItem('backlog', noni.backlogArr)
            } else if (sectionClass.classList.contains('in-progress')) {
                noni.inProgressArr.push(addItemText)
                localStorage.setItem('in-progress', noni.inProgressArr)
            } else if (sectionClass.classList.contains('complete')) {
                noni.completeArr.push(addItemText)
                localStorage.setItem('complete', noni.completeArr)
            } else if (sectionClass.classList.contains('on-hold')) {
                noni.onHoldArr.push(addItemText)
                localStorage.setItem('on-hold', noni.onHoldArr)
                } 
            }
        },

        rebuildArrays: function() {
            for (let i=0; i<noni.allArrayNames.length; i++) {
                noni.allArrayNames[i] = []
                for (let j = 0; j < allLiList[i].children.length; j++) {
                    noni.allArrayNames[i].push(allLiList[i].children[j].textContent);
                  }
                  localStorage.setItem(noni.allLiNames[i], noni.allArrayNames[i])
            }
        },

        onLoadData: function() {
        if (localStorage.getItem('backlog')) {
            noni.backlogArr = localStorage.getItem('backlog').split(",")
            noni.allArray.push(noni.backlogArr)
        } else {
            noni.backlogArr = []
            noni.allArray.push(noni.backlogArr)
        }
        if (localStorage.getItem('in-progress')) {
            noni.inProgressArr = localStorage.getItem("in-progress").split(",")
            noni.allArray.push(noni.inProgressArr)
        } else {
            noni.inProgressArr = []
            noni.allArray.push(noni.inProgressArr)
        }
        if (localStorage.getItem('complete')) {
            noni.completeArr = localStorage.getItem("complete").split(",")
            noni.allArray.push(noni.completeArr)
        } else {
            noni.completeArr = []
            noni.allArray.push(noni.completeArr)
        }
        if (localStorage.getItem('on-hold')) {
            noni.onHoldArr = localStorage.getItem("on-hold").split(",")
            noni.allArray.push(noni.onHoldArr)
        } else {
            noni.onHoldArr = []
            noni.allArray.push(noni.onHoldArr)
        }
    }
}

window.onload = () => {

    noni.onLoadData()
    noni.loadLocalData()
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
    noni.rebuildArrays();
}

function dragEnter(column) {
    currentColumn = column;
  }

// Save items
saveBtns.forEach((saveBtn) => {
    saveBtn.addEventListener('click', (e) => {
        noni.saveBtnClick(e)
    })
})