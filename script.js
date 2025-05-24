import { restaurants } from "./restaurants.js";

renderImages();
function renderImages() {
  restaurants.forEach((restaurant) => {
    const imageContainer = document.querySelector(".img-container");

    if (restaurants) {
      const imageContain = document.createElement("div");
      imageContain.innerHTML = `
     <img src='${restaurant.image}'
            class="image"/>
          <p class="img-text">
            ${restaurant.name}
            <span><img src="${restaurant.icon}" alt="like-icon" /></span>
          </p>
    `;
      imageContainer.appendChild(imageContain);
    }
  });
}
