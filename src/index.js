let addToy = false;
const addBtn = document.getElementById('new-toy-btn')
const toyForm = document.querySelector('.container')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {
   fetch("../db.json")
  .then(response => response.json())
  .then(json =>{ 
    setTimeout( ()=> {  showToys(json.toys); }, 1000)
   });

}

function showToys(json) {
  console.log(json)
  let toyCollection = document.getElementById("toy-collection")
  json.forEach(element => {
    let cardDiv = document.createElement("div")
    cardDiv.className = "card"
    let button = document.createElement("button")
    button.className = "like-btn"
    button.id = element.id
    button.innerText = "Like Me!"
    button.addEventListener("click", function(event) {
      addLikes(event)
    })
    let h2 = document.createElement("h2")
    h2.innerHTML = element.name
    let img = document.createElement("img")
    img.src = element.image
    img.alt = element.name
    img.className = "toy-avatar"
    let p = document.createElement("p")
    p.innerText = `${element.likes} Likes`

    cardDiv.append(h2, img, button, p)
    toyCollection.appendChild(cardDiv)
  });
}

document.addEventListener("DOMContentLoaded", function() {
  fetchToys()

}) 