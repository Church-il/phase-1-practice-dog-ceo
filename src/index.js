document.addEventListener('DOMContentLoaded', () => {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  const dogImageContainer = document.getElementById('dog-image-container');
  const dogBreedsList = document.getElementById('dog-breeds');
  const breedDropdown = document.getElementById('breed-dropdown');
  let allBreeds = [];

  // Fetch and display dog images
  fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
          data.message.forEach(imageUrl => {
              const img = document.createElement('img');
              img.src = imageUrl;
              dogImageContainer.appendChild(img);
          });
      });

  // Fetch all breeds and store them
  fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
          allBreeds = Object.keys(data.message);
          renderBreeds(allBreeds);
      });

  // Render breeds to the list
  function renderBreeds(breeds) {
      dogBreedsList.innerHTML = '';
      breeds.forEach(breed => {
          const li = document.createElement('li');
          li.textContent = breed;
          dogBreedsList.appendChild(li);
      });
  }

  // Change font color on click
  dogBreedsList.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
          event.target.style.color = 'blue'; // Change to your desired color
      }
  });

  // Filter breeds based on dropdown selection
  breedDropdown.addEventListener('change', (event) => {
      const selectedLetter = event.target.value;
      const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
      renderBreeds(filteredBreeds);
  });
});
