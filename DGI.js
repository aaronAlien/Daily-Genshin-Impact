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
        currentDayBooks.innerHTML += `<h4>${book.items[0].name}</h4> <p>${book.characters.join(' | ')}</p>`;
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
      let currentDayWeapons = document.getElementById('currentDayWeapons');
      if (weapon.availability.includes(week[dayIndex])) {
        currentDayWeapons.innerHTML += `<p>${weapon.items[0].name}</p>`;
      }
    });
    if (!Array.isArray(data)) {
      return false;
    }
  })
  .catch((error) => console.log(error));

  
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
