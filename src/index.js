const API_URL = "http://localhost:3000/toys";
let addToy = false;

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

  fetchToys();

  document.querySelector('.add-toy-form').addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const imgUrl = formData.get('image');

    addToyToCollection(name, imgUrl);
  })
});

function addToyToCollection(name, imgUrl) {
  return fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "image": imgUrl,
        "likes": "0",
      }),
    })
    .then(response => response.json())
    .then(json => {
      const collection = document.querySelector('#toy-collection');
      const card = makeToyCard(json[0]);
      collection.append(card);
    });
}

function fetchToys() {
  return fetch(API_URL)
    .then(response => response.json())
    .then(json => Object.keys(json).forEach(toy => {
      const toyCollection = document.querySelector('#toy-collection');
      const card = makeToyCard(json[toy]);
      toyCollection.append(card);
      }
    ));
}

function makeToyCard(toy) {
  const card = document.createElement('div');
  card.className = 'card';

  const name = document.createElement('h2');
  name.innerText = toy.name;

  const avatar = document.createElement('img');
  avatar.className = 'toy-avatar';
  avatar.alt = '';
  avatar.src = toy.image;

  const likeCtr = document.createElement('p');
  likeCtr.innerText = `${toy.likes} Like`;
  if (toy.likes != 0 && toy.likes != 1 && toy.likes != -1)
    likeCtr.innerText += 's';

  const likeBtn = document.createElement('btn');
  likeBtn.className = 'like-btn';

  card.append(name, avatar, likeCtr, likeBtn);
  return card;
}
