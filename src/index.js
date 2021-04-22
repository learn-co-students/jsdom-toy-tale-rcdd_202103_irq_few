let addToy = false;
const BASE_URL = 'http://localhost:3000/toys';
const collection = document.querySelector('#toy-collection');
const newToyForm = document.querySelector('.add-toy-form');
const toyName = document.querySelector('.input-text');
const toyImageUrl = document.querySelector('.input-url');

document.addEventListener('DOMContentLoaded', () => {
	const addBtn = document.querySelector('#new-toy-btn');
	const toyFormContainer = document.querySelector('.container');
	addBtn.addEventListener('click', () => {
		// hide & seek with the form
		addToy = !addToy;
		if (addToy) {
			toyFormContainer.style.display = 'block';
		} else {
			toyFormContainer.style.display = 'none';
		}
	});
});

document.addEventListener('DOMContentLoaded', () => {
	fetch(BASE_URL)
		.then(respone => {
			return respone.json();
		})
		.then(json => {
			showToys(json);
		})
		.catch(e => {
			console.log(e);
		});
});
newToyForm.addEventListener('submit', e => {
	e.preventDefault();
	fetch(BASE_URL, {
		method: 'POST',
		body: JSON.stringify({
			name: `${toyName.value}`,
			image: `${toyImageUrl.value}`,
			likes: 0,
		}),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
		.then(response => {
			return response.json();
		})
		.then(toys => {
			showToys(toys);
		})
		.catch(e => {
			console.log(e);
		});
});

const showToys = json => {
	if (json.length > 1) {
		json.forEach(json => {
			showEachToy(json);
		});
	} else {
		showEachToy(json);
	}
};

const showEachToy = json => {
	const div = document.createElement('div');
	const h2 = document.createElement('h2');
	const image = document.createElement('img');
	const likes = document.createElement('p');
	const button = document.createElement('button');

	h2.innerHTML = json.name;
	image.src = `${json.image}`;
	image.classList = 'toy-avatar';
	likes.innerHTML = json.likes + ' likes';
	button.classList = `like-btn`;
	button.innerHTML = 'Like';
	div.classList = 'card';
	button.type = 'button';
	button.addEventListener('click', e => {
		addLikes(json.id, e);
	});
	div.append(h2);
	div.append(image);
	div.append(likes);
	div.append(button);
	collection.append(div);
};

const addLikes = (id, e) => {
	e.preventDefault();

	const likeNumber = document.getElementsByTagName('p')[id];
	const toyUrl = BASE_URL + '/' + id;

	fetch(toyUrl, {
		method: 'PATCH',
		body: JSON.stringify({
			likes: parseInt(likeNumber.innerText) + 1,
		}),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	})
		.then(respone => {
			return respone.json();
		})
		.then(toy => {
			likeNumber.innerText = toy.likes + ' likes';
		})
		.catch(e => {
			console.log(e);
		});
};
