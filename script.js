// Default HTML ELements
const imgSection = document.querySelector("#outdoor-img");
const imgContainer = document.querySelector(".img-container");
const nonModals = document.querySelector(".non-modals");

// Edit Profile Modal Elements
const editBtn = document.querySelector(".edit");
const editModal = document.getElementById("editModal");
editModal.style.display = "none"
const cancelEdit = document.getElementById("cancelEdit");
const form = document.getElementById("editForm");

const nameInput = document.getElementById("name");
const titleInput = document.getElementById("title");
const avatarInput = document.getElementById("avatar");

// Targeting Elements I want to update
const nameDisplay = document.querySelector(".details h1");
const titleDisplay = document.querySelector(".details p");
const avatarDisplay = document.querySelector(".profile-img img");

const cardData = [
  {
    src: "assets/pexels-kassandre-pedro-8639743 1.png",
    alt: "Val Thoren",
    caption: "Val Thoren",
  },
  {
    src: "assets/pexels-kassandre-pedro-8639743 1 (1).png",
    alt: "Restaurant terrace",
    caption: "Restaurant terrace",
  },
  {
    src: "assets/pexels-kassandre-pedro-8639743 1 (2).png",
    alt: "An outdoor cafe",
    caption: "An outdoor cafe",
  },
  {
    src: "assets/pexels-kassandre-pedro-8639743 1 (3).png",
    alt: "A very long bridge",
    caption: "A very long bridge, over the forest",
  },
  {
    src: "assets/pexels-kassandre-pedro-8639743 1 (4).png",
    alt: "Tunnel with morning light",
    caption: "Tunnel with morning light",
  },
  {
    src: "assets/pexels-kassandre-pedro-8639743 1 (5).png",
    alt: "Mountain house",
    caption: "Mountain house",
  },
];

const renderCardImages = () => {
  cardData.forEach((image) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${image.src}" alt="${image.alt}" class="image" />
      <p class="img-text">
        ${image.caption}
        <span><img src="assets/Union.png" alt="like-icon" class="like" /></span>
      </p>
    `;

    imgContainer.append(div);
    imgSection.appendChild(imgContainer);

    const imageModal = document.getElementById("imageModal");
    const previewImage = document.getElementById("previewImage");
    const previewTitle = document.getElementById("previewTitle");
    const closeImageModal = document.getElementById("closeImageModal");

    const likeIcon = div.querySelector(".like");
    likeIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent triggering image modal
      if (likeIcon.src.includes("Union.png")) {
        likeIcon.src = "assets/heart.png"; // liked
      } else {
        likeIcon.src = "assets/Union.png"; // unliked
      }
    });

     imgContainer.addEventListener("click", function (e) {
      const target = e.target;

      if (target.classList.contains("image")) {
        const caption =
          target.nextElementSibling?.innerText?.trim() || "Image Preview";

        previewImage.src = target.src;
        previewTitle.innerText = caption;

        imageModal.style.display = "flex";
        nonModals.classList.add("blurred");
      }
    });

    closeImageModal.addEventListener("click", () => {
      imageModal.style.display = "none";
      nonModals.classList.remove("blurred");
    });

    window.addEventListener("click", function (e) {
      if (e.target === imageModal) {
        imageModal.style.display = "none";
        nonModals.classList.remove("blurred");
      }
    });
  

renderCardImages();

  });
};

renderCardImages();

