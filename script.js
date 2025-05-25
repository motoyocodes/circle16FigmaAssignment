// Default HTML ELements
const imgSection = document.querySelector("#outdoor-img");
const imgContainer = document.querySelector(".img-container");
const nonModals = document.querySelector(".non-modals");

// Edit Profile Modal Elements
const editBtn = document.querySelector(".edit");
const editModal = document.getElementById("editModal");
editModal.style.display = "none";
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
  });
};

renderCardImages();

editBtn.addEventListener("click", () => {
  editModal.style.display = "flex";
  console.log("clicked");
  nameInput.value = nameDisplay.textContent;
  titleInput.value = titleDisplay.textContent;
  avatarInput.value = avatarDisplay.textContent;
  nonModals.classList.add("blurred");
});

cancelEdit.addEventListener("click", () => {
  editModal.style.display = "none";
  nonModals.classList.remove("blurred");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name");
  const title = document.getElementById("title");
  const nameError = document.getElementById("nameError");
  const titleError = document.getElementById("titleError");

  let valid = true;

  if (name.value.trim().length < 2) {
    nameError.innerText = "Name must be at least 2 characters";
    valid = false;
  } else {
    nameError.innerText = "";
  }

  if (title.value.trim().length < 2) {
    titleError.innerText = "Title must be at least 2 characters";
    valid = false;
  } else {
    titleError.innerText = "";
  }

  if (valid) {
    // Update profile info
    document.querySelector("h1").innerText = name.value;
    document.querySelector("#profile p").innerText = title.value;

    // Update profile image if file is selected
    if (avatarInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        avatarDisplay.src = e.target.result;
      };
      reader.readAsDataURL(avatarInput.files[0]);
    }

    editModal.style.display = "none";
    nonModals.classList.remove("blurred");
  }
});

const newPostBtn = document.querySelector(".post button");
const newPostModal = document.getElementById("newPostModal");
const cancelPost = document.getElementById("cancelPost");
const newPostForm = document.getElementById("newPostForm");
const postTitleInput = document.getElementById("postTitle");
const postImageInput = document.getElementById("postImage");

// Open New Post Modal
newPostBtn.addEventListener("click", () => {
  newPostModal.style.display = "flex";
  nonModals.classList.add("blurred");
});

// Cancel New Post
cancelPost.addEventListener("click", () => {
  newPostModal.style.display = "none";
  nonModals.classList.remove("blurred");
  newPostForm.reset();
});

newPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = postTitleInput.value.trim();
  const file = postImageInput.files[0];

  if (file && title) {
    const reader = new FileReader();
    reader.onload = function () {
      const imageUrl = reader.result;

      const card = document.createElement("div");
      card.innerHTML = `
        <img src="${imageUrl}" class="image" alt="${title}" />
        <p class="img-text">
          ${title}
          <span><img src="assets/Union.png" alt="like-icon" class="like" /></span>
        </p>
      `;
      imgContainer.appendChild(card);

      const likeImg = card.querySelector(".like");
      likeImg.addEventListener("click", (e) => {
        e.stopPropagation();
        if (likeImg.src.includes("Union.png")) {
          likeImg.src = "assets/heart.png";
        } else {
          likeImg.src = "assets/Union.png";
        }
      });

      newPostModal.style.display = "none";
      nonModals.classList.remove("blurred");
      newPostForm.reset();
    };
    reader.readAsDataURL(file);
  }
});
