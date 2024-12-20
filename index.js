/* NAV */
const hamburger = document.getElementById("hamburger-btn");

hamburger.addEventListener("click", function () {
  const navMenu = document.querySelector(".links ul");
  navMenu.classList.toggle("active");
});

/* MODAL */
const modalContainer = document.getElementById("modal-container");
const modal = document.getElementById("modal");

const openModal = () => {
  modalContainer.style.display = "flex";

  // scroll
  modal.scrollIntoView({
    behavior: "smooth", 
    block: "center",
  });
};

const closeModal = () => {
  modalContainer.style.display = "none";


  mySearch.value = "";

  const imgContainer = document.querySelector(".char-img-container");
  if (imgContainer) {
    imgContainer.remove();
  }
};

const closeButton = document
  .getElementById("close-btn")
  .addEventListener("click", closeModal);

//close click outside
window.onclick = (e) => {
  if (e.target === modalContainer) {
    closeModal();
  }
};

// weekdays
const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const dayDisplay = document.getElementById("day-display");
const currentDate = new Date();
const dayIndex = currentDate.getDay();

// weekday output
dayDisplay.textContent = `${week[dayIndex]}`;

// h5 headings
function h5Style() {
  const h5Titles = document.querySelectorAll("h5");

  h5Titles.forEach((h5) => {
    h5.style.textAlign = "center";
    h5.style.maxWidth = "80%";
    h5.style.margin = "0 auto";
    h5.style.fontSize = "1.3rem";
    h5.style.marginBottom = ".8rem";
    h5.style.color = "var(--color-a)";
    h5.style.borderBottom = "2px solid rgba(144,85,207, 0.9)";
  });
}

// character search
async function fetchData(char) {
  try {
    const mySearch =
      document.getElementById("mySearch").value.toLowerCase() || char;

    mySearch.value = "";

    const response = await fetch(
      `https://genshin.jmp.blue/characters/${mySearch}`
    );
    const response2 = await fetch(
      `https://genshin.jmp.blue/characters/${mySearch}/portrait`
    );

    if (!response.ok || !response2.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    const dataArray3 = Object.values(data);
    console.log(dataArray3);

    const imgData = await response2.blob();
    const url = URL.createObjectURL(imgData);

    // search output - text
    const searchOutput = document.getElementById("searchOutput");
    searchOutput.innerHTML = `
    <div class="modal-name">
      <h3>${dataArray3[0]}</h3>
      <p>"${dataArray3[1]}"</p>
    </div>

     ${
       dataArray3[0].startsWith("Traveler")
         ? ` <ul>
         <li>${dataArray3[9]}</li>
  <li>${dataArray3[4]}</li>
  <li>Vision: ${dataArray3[1]}</li>
  <li>Weapon: ${dataArray3[2]}</li>
  </ul>`
         : `<ul>
  <li>Nation: ${dataArray3[5]}</li>
  <li>Vision: ${dataArray3[2]}</li>
  <li>Weapon: ${dataArray3[3]}</li>
  <li>Rarity: ${dataArray3[7]}⭐</li>
  <li>Description: ${dataArray3[11]}</li>
</ul>`
     }`;

    // search output - image
    const imgContainer = document.createElement("div");
    imgContainer.className = "char-img-container";
    imgContainer.style.maxWidth = "90%";

    const img = document.createElement("img");

    img.style.maxWidth = "250px";
    img.style.height = "auto";
    img.style.objectFit = "cover";
    img.src = url;

    imgContainer.appendChild(img);
    modal.append(imgContainer);
  } catch (error) {
    console.log(error);
  }
}
mySearch.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    fetchData();
    openModal();
  }
});

const searchBtn = document
  .getElementById("searchBtn")
  .addEventListener("click", () => {
    fetchData();
    openModal();
  });

// CHARACTERS
let charImg;
fetch("https://genshin.jmp.blue/materials/talent-book")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const dataArray = Object.values(data);

    let currentDayBooks = document.getElementById("currentDayBooks");

    dataArray.forEach((book) => {
      if (book.availability?.includes(week[dayIndex])) {
        let bookDiv = document.createElement("div");
        let todaysBooks = book.items[0].name;
        let title = document.createElement("h5");
        title.textContent = todaysBooks;

        bookDiv.appendChild(title);

        let todaysCharacters = book.characters;

        todaysCharacters.forEach((char) => {
          const charUrl1 = `https://genshin.jmp.blue/characters/${char}/icon-big`;
          const charUrl2 = `https://genshin.jmp.blue/characters/${char}/icon`;
          const charImg = document.createElement("img");
          charImg.id = "todays-character-img";

          // either icon
          charImg.src = charUrl1 || charUrl2;
          charImg.style.height = "70px";
          charImg.style.margin = "5px";
          charImg.alt = char;

          bookDiv.appendChild(charImg);

          charImg.addEventListener("click", () => {
            fetchData(char);
            openModal();
          });
        });

        currentDayBooks.appendChild(bookDiv);
      }
    });
    h5Style();
    if (!Array.isArray(data)) {
      return false;
    }
  })
  .catch((error) => console.log(error));

// WEPONS NEW
fetch("https://genshin.jmp.blue/materials/weapon-ascension")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const dataArray2 = Object.values(data);

    let currentDayWeapons = document.getElementById("currentDayWeapons");

    dataArray2.forEach((mat) => {
      if (mat.availability?.includes(week[dayIndex])) {
        let weaponDiv = document.createElement("div");

        //let todaysWeaponMats = mat.items[3].id;
        let todaysWeaponMats = mat.items[0].name;
        console.log("Weapon materials: ", todaysWeaponMats);

        let title2 = document.createElement("h5");
        title2.textContent = todaysWeaponMats;

        weaponDiv.appendChild(title2);

        let todaysWeapons = mat.weapons;
        console.log("Todays weapons: ", todaysWeapons);

        todaysWeapons.forEach((weapon) => {
          //console.log(weapon);

          const url = `https://genshin.jmp.blue/weapons/${weapon}/icon`;
          const imageElement = document.createElement("img");

          imageElement.src = url;
          imageElement.style.height = "70px";
          imageElement.style.margin = "2px";
          imageElement.alt = `${weapon}`;

          weaponDiv.appendChild(imageElement);
        });
        currentDayWeapons.appendChild(weaponDiv);
      }
    });
    h5Style();

    if (!Array.isArray(data)) {
      return false;
    }
  })
  .catch((error) => console.log(error));

// wish banner
const wishOne = "assets/wishBanner/5Point2_Phase2_char1.jpg";
const wishTwo = "assets/wishBanner/5Point2_Phase2_char2.jpg";
const wishWeapon = "assets/wishBanner/5Point2_Phase2_weapon.jpg";


class WishBanner {
  constructor() {
    this.slides = [wishOne, wishTwo, wishWeapon];
    this.slideInfo = [
      `Version 5.2 Phase 2 | 4-star characters: Fischl, Yaoyao, and Heizou.`,
      `Version 5.2 Phase 2 | 4-star characters: Fischl, Yaoyao, and Heizou.`,
      `Version 5.2 Phase 2 | 4-star characters: Fischl, Yaoyao, and Heizou.`,
    ];

    this.currentIndex = 0;
    this.carouselInterval = null;

    this.render();
    this.startCarousel();
  }

  render() {
    const container = document.getElementById("wish-banner");
    container.innerHTML = `
    <div class="carousel-container">
    
    <img
    src='${this.slides[this.currentIndex]}'
    alt='event wish'
    class='carousel-image' />
    <span>${this.slideInfo[this.currentIndex]}</span>
    <span>images: Hoyverse</span>
    </div>
    `;
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.render();
    }, 3000);
  }

  stopCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const wishBanner = new WishBanner();
});
