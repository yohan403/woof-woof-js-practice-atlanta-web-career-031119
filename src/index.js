// document.addEventListener('DOMContentLoaded', function(){

// });


fetch('http://localhost:3000/pups')
.then(function(response) { return response.json(); })
.then(function(pups) { addAllPups(pups); })


function addAllPups(pups) {
    pups.forEach(pup => addAPupButton(pup))
}

function addAPupButton(pup) {
    const pupList = document.querySelector('#dog-bar')

    let span = document.createElement('span')
    span.textContent = pup.name
    span.id = pup.id
    
    pupList.appendChild(span)
    
    span.addEventListener('click', handleClick)

}

function handleClick(e) {
    e.preventDefault()
    const id = e.target.id

    fetch('http://localhost:3000/pups')
    .then(function(response) { return response.json(); })
    .then(function(pups) { findDog(id,pups); })
}

function findDog(id,pups) {
    id = id - 1
    let thePup = pups[`${id}`]

    let imgCheck = document.querySelector('#dog-info img')
    let h2Check = document.querySelector('#dog-info h2')
    let buttonCheck = document.querySelector('#dog-info button')

    if (imgCheck == null && h2Check == null && buttonCheck == null) {
        addThePup(thePup)
    } else {
        replaceThePup(thePup)
    }

}

function addThePup(thePup) {
    const dogInfo = document.querySelector('#dog-info')

    let img = document.createElement('img')
    img.src = thePup.image

    let h2 = document.createElement('h2')
    h2.innerText = thePup.name

    let button = document.createElement('button')
    button.id = thePup.id
    if (thePup.isGoodDog == true) {
        button.innerText = "Good Dog!"
    } else {
        button.innerText = "Bad Dog!"
    }

    button.addEventListener('click', handleUpdateClick)

    dogInfo.appendChild(img)
    dogInfo.appendChild(h2)
    dogInfo.appendChild(button)
}

function replaceThePup(thePup) {

    let img = document.querySelector('#dog-info img')
    img.src = thePup.image

    let h2 = document.querySelector('#dog-info h2')
    h2.innerText = thePup.name

    let button = document.querySelector('#dog-info button')
    button.id = thePup.id
    if (thePup.isGoodDog == true) {
        button.innerText = "Good Dog!"
    } else {
        button.innerText = "Bad Dog!"
    }

    button.addEventListener('click', handleUpdateClick)
}

function handleUpdateClick(e) {
    e.preventDefault()
    const id = e.target.id

    fetch('http://localhost:3000/pups')
    .then(function(response) { return response.json(); })
    .then(function(pups) { findDogForUpdate(id,pups); })
}


function findDogForUpdate(id,pups) {
    id = id - 1
    let thePup = pups[`${id}`]

    updateStatus(thePup)
}

function updateStatus(thePup) {

    changeStatus(thePup)

    fetch(`http://localhost:3000/pups/${thePup.id}`,{
	headers:{
		'Content-Type': 'application/json' 
	},	
	method:'PATCH',
	body: JSON.stringify(thePup)
    }).then((response)=> console.log(response))

}

function changeStatus(thePup) {
    if (thePup.isGoodDog == true) {
        thePup.isGoodDog = false
    } else {
        thePup.isGoodDog = true
    }
}