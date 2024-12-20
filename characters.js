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

  //clear search
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

// ALL CHARACTERS
fetch("https://genshin.jmp.blue/materials/talent-book")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    for (const key in data) {
      if (data[key].characters) {
        const allCharacters = data[key].characters;
        //console.log(allCharacters);

        allCharacters.forEach((char) => {
          //console.log(char);

          const iconUrl = `https://genshin.jmp.blue/characters/${encodeURIComponent(
            char
          )}/icon`;

          // icon fetch
          fetch(iconUrl)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`unable to fetch image for ${char}`);
              }
              return response.blob();
            })
            .then((blob) => {
              const imageUrl = URL.createObjectURL(blob);
              //console.log(`icon image for ${char}`, imageUrl);

              // DOM
              const characterList = document.getElementById("character-list");

              const listItem = document.createElement("li");
              listItem.className = "character-item";
              listItem.setAttribute("data-char", char);

              const characterIcon = document.createElement("img");
              characterIcon.src = imageUrl;
              characterIcon.alt = char;

              const charName = document.createElement("span");
              charName.textContent = char;
              charName.className = "character-name";

              listItem.appendChild(characterIcon);
              listItem.appendChild(charName);
              characterList.appendChild(listItem);

              listItem.addEventListener("click", () => {
                fetchData(char);
                openModal();
              });
            });
        });
      }
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
