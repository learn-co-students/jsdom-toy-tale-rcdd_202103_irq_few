let addToy = false;
document.addEventListener("DOMContentLoaded",function () {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click",function () {
    
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function createName(toy, card) {
  let name = document.createElement('h2')
  name.innerText = toy.name
  card.appendChild(name)
}

function createPhoto(toy, card) {
  let img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"
  card.appendChild(img)
}


function totalLikes(toy, card) {
  let likes = document.createElement('p')
  likes.innerText = `${toy.likes} likes`
  card.appendChild(likes)
}


function addButton(toy, card) {
  let newButton = document.createElement('button')
  newButton.addEventListener('click', function() {
    increaseCount(toy);
    window.location.reload(true);
  })
  newButton.className = "like-btn"
  newButton.style = "width: 30px;height:30px;cursor:pointer;"
  newButton.innerText = "♥"
  card.appendChild(newButton)
}



form = document.querySelector('.add-toy-form')
form.addEventListener('submit', submitData)

function submitData() {

  let formData = {
    "name": document.querySelectorAll('.input-text')[0].value,
    "image": document.querySelectorAll('.input-text')[1].value,
    "likes": "0"
  }

  let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObj)
      .then(response => response.json())
      .then(json => console.log(json))
}


function increaseCount(toy) {

  let config = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": parseInt(toy.likes) + 1
        })
  };

  fetch(`http://localhost:3000/toys/${toy.id}`, config)
}
