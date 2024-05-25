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
const currentDateString = currentDate.toLocaleDateString("en-UK", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// weekday output
dayDisplay.textContent = `${week[dayIndex]}`;
dayDisplay.style.color = "var(--light-font)";
dayDisplay.style.border = "1px solid white";
dayDisplay.style.padding = "1rem";

fetch("https://genshin.jmp.blue/materials/talent-book")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    // console.log(Array.isArray(data));

    // Convert the object's values into an array
    const dataArray = Object.values(data);
    //console.log(dataArray);

    dataArray.forEach((book) => {
      let currentDayBooks = document.getElementById("currentDayBooks");
      if (book.availability.includes(week[dayIndex])) {
        currentDayBooks.innerHTML += `<h4>${
          book.items[0].name
        }</h4> <p>${book.characters
          .map(
            (character) =>
              character.charAt(0).toUpperCase() + character.slice(1)
          )
          .join(" | ")}</p>`;
      }
    });

    if (!Array.isArray(data)) {
      return false;
    }
  })
  .catch((error) => console.log(error));

fetch("https://genshin.jmp.blue/materials/weapon-ascension")
  .then((res) => res.json())
  .then((data) => {
    //console.log(data);

    const dataArray2 = Object.values(data);
    //console.log(dataArray2);

    dataArray2.forEach((weapon) => {
      let currentDayWeapons = document.getElementById("currentDayWeapons");
      if (weapon.availability.includes(week[dayIndex])) {
        currentDayWeapons.innerHTML += `<h4>${weapon.items[0].name}</h4>
        <p>${weapon.weapons
          .map(
            (weapon) =>
              weapon.charAt(0).toUpperCase() +
              weapon.replace(/-/g, " ").slice(1)
          )
          .join(" | ")}
        </p>`;
      }
    });
    if (!Array.isArray(data)) {
      return false;
    }
  })
  .catch((error) => console.log(error));

// character search

async function fetchData() {
  try {
    const mySearch = document
      .getElementById("mySearch")
      .value.toLocaleLowerCase();

    const response = await fetch(
      `https://genshin.jmp.blue/characters/${mySearch}`
    );
    const response2 = await fetch(
      `https://genshin.jmp.blue/characters/${mySearch}/card`
    );

    if (!response.ok || !response2.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    const dataArray3 = Object.values(data);
    //console.log(dataArray3);

    const imgData = await response2.blob();
    const url = URL.createObjectURL(imgData);

    // search output - text
    const searchOutput = document.getElementById("searchOutput");
    searchOutput.innerHTML += dataArray3.slice(0, 12).join(" - ");

    // search output - image
    const imgContainer = document.createElement("div");
    imgContainer.style.maxWidth = "100%";

    const img = document.createElement("img");
    img.style.width = "300px";
    img.style.height = "450px";
    img.style.objectFit = "contain";
    img.src = url;

    // append image to container - then append container to searchOutput
    imgContainer.appendChild(img);
    searchOutput.append(imgContainer);

    //console.log(data);
  } catch (error) {
    console.log(error);
  }
}

const searchBtn = document
  .getElementById("searchBtn")
  .addEventListener("click", fetchData);

// links function
const openLink = (url) => {
  window.open(url, "_blank");
};

const mapBtn = document
  .getElementById("mapBtn")
  .addEventListener("click", () =>
    openLink("https://act.hoyolab.com/ys/app/interactive-map/index.html")
  );

const checkInBtn = document
  .getElementById("checkInBtn")
  .addEventListener("click", () =>
    openLink(
      "https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481"
    )
  );

const wikiBtn = document
  .getElementById("wikiBtn")
  .addEventListener("click", () =>
    openLink("https://genshin-impact.fandom.com/wiki/Genshin_Impact_Wiki")
  );
