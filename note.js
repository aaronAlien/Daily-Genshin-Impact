/*charPageTitle.style.fontSize = '2.6rem';
charPageTitle.style.color = 'var(--color-g)';
charPageTitle.style.backgroundColor = 'rgba(0, 0, 0, 0.443)';
charPageTitle.style.borderRadius = '2.5rem';
charPageTitle.style.maxWidth = '50%';
charPageTitle.style.margin = '2rem auto 0 auto';
charPageTitle.style.textAlign  = 'center';
charPageTitle.style.position = 'relative';*/
const charactersDisplayed = document.getElementById("charactersDisplay");


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
dayDisplay.style.fontSize = "2.6rem";
dayDisplay.style.color = "var(--color-g)";
dayDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.443)";
dayDisplay.style.borderRadius = "2.5rem";
dayDisplay.style.maxWidth = "50%";
dayDisplay.style.margin = "2rem auto 0 auto";
dayDisplay.style.textAlign = "center";
dayDisplay.style.position = "relative";
/*dayDisplay.style.boxShadow = '0 0 10px #6c6c6c';*/

// h5 headings
function h5Style() {
  const h5Titles = document.querySelectorAll("h5");

  h5Titles.forEach((h5) => {
    h5.style.fontSize = "2.2rem";
    h5.style.paddingBottom = "2rem";
    h5.style.color = "var(--color-g)";
    h5.style.textDecoration = "underline";
  });
}

/*
fetch("https://genshin.jmp.blue/characters/all")
  .then((res) => res.json())
  .then((data) => {
    console.log(data); // returns object
    console.log(Array.isArray(data)); // bool

    // Convert the object's values into an array
    const dataArray3 = Object.values(data);
    console.log(dataArray3); // new variable converted

    const charactersDisplayed = document.getElementById("charactersDisplay");

    dataArray3.forEach((char) => {
      let allCharsDiv = document.createElement("div");
      const charName = char.name;
      //allCharsDiv.innerHTML = charName;
      //console.log(charName);

      const charNameText = document.createTextNode(charName);
      allCharsDiv.appendChild(charNameText);

      const charUrl3 = `https://genshin.jmp.blue/characters/${charName}/icon-big`;
      const charUrl4 = `https://genshin.jmp.blue/characters/${charName}/icon`;

      const allCharImg = document.createElement("img");

      // search for either icon
      allCharImg.src = `${charUrl3}` || `${charUrl4}`;
      allCharImg.style.height = "70px";
      allCharImg.style.margin = "5px";
      allCharImg.alt = charName + " icon";

      //const charNameText = document.createTextNode(charName);
      //allCharsDiv.appendChild(charNameText);
      allCharsDiv.appendChild(allCharImg);

      charactersDisplayed.appendChild(allCharsDiv);
    });

    h5Style();

    if (!Array.isArray(data)) {
      return false;
    }
  })
  .catch((error) => console.log(error));
*/

fetch("https://genshin.jmp.blue/characters/all")
  .then((res) => res.json())
  .then((data) => {
    console.log(data); // returns object
    console.log(Array.isArray(data)); // bool
    const dataArray3 = Object.values(data);
    console.log(dataArray3); // new variable converted

dataArray3.forEach((char) => {
  const charName = char.name.toLocaleLowerCase();
  //console.log(charName);

  const allCharsDiv = document.createElement("div");
  const charNameText = document.createTextNode(charName);
  allCharsDiv.appendChild(charNameText);
  //const encodedCharName = encodeURIComponent(char.name.toLocaleLowerCase());
  const charUrl = `https://genshin.jmp.blue/characters/${charName}/icon`;
  const fallbackUrl = `https://genshin.jmp.blue/characters/${charName}/icon-big`;

  fetch(charUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const allCharImg = document.createElement("img");
      allCharImg.src = url;
      allCharImg.style.height = "70px";
      allCharImg.style.margin = "5px";
      allCharImg.alt = charName + " icon";
      allCharsDiv.appendChild(allCharImg);
    })

    .catch((error) => {
      fetch(fallbackUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const allCharImg = document.createElement("img");
          allCharImg.src = url;
          allCharImg.style.height = "70px";
          allCharImg.style.margin = "5px";
          allCharImg.alt = charName + " icon";
          allCharsDiv.appendChild(allCharImg);
        });
    });

  charactersDisplayed.appendChild(allCharsDiv);
});
h5Style();

if (!Array.isArray(data)) {
  return false;
}
})
.catch((error) => console.log(error));
