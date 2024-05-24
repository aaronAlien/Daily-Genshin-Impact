// weekdays

const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
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
    //console.log(data);
    // console.log(Array.isArray(data));

    // Convert the object's values into an array
    const dataArray = Object.values(data);
    console.log(dataArray);

    dataArray.forEach((book) => {
      const currentDayBooks = document.getElementById("currentDayBooks");
      if (book.availability.includes(week[dayIndex])) {
        currentDayBooks.innerHTML += `
      <h2>${book.items[0].name}</h2>
      <p>${book.characters.join(', ')}</p>
    `;
      }
  

    });

    if (!Array.isArray(data)) {
      return false;
    }
  })
  .catch((error) => console.log(error));


