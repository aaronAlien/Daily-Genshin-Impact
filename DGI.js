// weekdays
const week = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const dayDisplay = document.getElementById('day-display');
const currentDate = new Date();
const dayIndex = currentDate.getDay();
const currentDateString = currentDate.toLocaleDateString('en-UK', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

// weekday output
dayDisplay.textContent = `${week[dayIndex]}`;
dayDisplay.style.fontSize = '2.6rem';
dayDisplay.style.color = 'var(--color-g)';
dayDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.443)';
dayDisplay.style.borderRadius = '2.5rem';
dayDisplay.style.maxWidth = '50%';
dayDisplay.style.margin = '2rem auto 0 auto';
dayDisplay.style.textAlign  = 'center';
dayDisplay.style.position = 'relative';
/*dayDisplay.style.boxShadow = '0 0 10px #6c6c6c';*/

// h5 headings
function h5Style() {
  const h5Titles = document.querySelectorAll('h5');

  h5Titles.forEach((h5) => {
    h5.style.fontSize = '2.2rem';
    h5.style.paddingBottom = '2rem';
    h5.style.color = 'var(--color-g)';
    h5.style.textDecoration = 'underline';
  });
}

// CHARACTERS
fetch('https://genshin.jmp.blue/materials/talent-book')
  .then((res) => res.json())
  .then((data) => {
     console.log(data); // returns object
     console.log(Array.isArray(data)); // ?bool

    // Convert the object's values into an array
    const dataArray = Object.values(data);
    console.log(dataArray); // new variable converted

    let currentDayBooks = document.getElementById('currentDayBooks');

    dataArray.forEach((book) => {
      if (book.availability?.includes(week[dayIndex])) {
        let bookDiv = document.createElement('div');
        let todaysBooks = book.items[0].name;
        let title = document.createElement('h5');
        title.textContent = todaysBooks;

        bookDiv.appendChild(title);

        let todaysCharacters = book.characters;
        //console.log(todaysCharacters);

        todaysCharacters.forEach((char) => {
          // eliminate traveler icons - not displaying
          if (char.startsWith('traveler-')) {
            return;
          }

          const charUrl1 = `https://genshin.jmp.blue/characters/${char}/icon-big`;
          const charUrl2 = `https://genshin.jmp.blue/characters/${char}/icon`;
          const charImg = document.createElement('img');

          // search for either icon
          charImg.src = charUrl1 || charUrl2;
          charImg.style.height = '70px';
          charImg.style.margin = '5px';
          charImg.alt = char;

          bookDiv.appendChild(charImg);
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

// WEAPONS
fetch('https://genshin.jmp.blue/materials/weapon-ascension')
  .then((res) => res.json())
  .then((data) => {
    const dataArray2 = Object.values(data);
    //console.log(dataArray2[1]);

    let currentDayWeapons = document.getElementById('currentDayWeapons');

    dataArray2.forEach((mat) => {
      if (mat.availability?.includes(week[dayIndex])) {
        //console.log(`Fetching ascension material icon for ${mat.items[0].name}`);

        let weaponDiv = document.createElement('div');
        let todaysWeaponMats = mat.items[0].name;
        let title2 = document.createElement('h5');
        title2.textContent = todaysWeaponMats;
        weaponDiv.appendChild(title2);

        let todaysWeapons = mat.weapons;
        //console.log(todaysWeapons);

        todaysWeapons.forEach((weapon) => {
          console.log(weapon);
          //console.log(`Fetching weapon icon for ${weapon}`);

          const url = `https://genshin.jmp.blue/weapons/${weapon}/icon`;
          const imageElement = document.createElement('img');

          imageElement.src = url;
          imageElement.style.height = '70px';
          imageElement.style.margin = '2px';
          imageElement.alt = weapon;

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

// character search
async function fetchData() {
  try {
    const mySearch = document
      .getElementById('mySearch')
      .value.toLocaleLowerCase();

    mySearch.value = '';

    const response = await fetch(
      `https://genshin.jmp.blue/characters/${mySearch}`
    );
    const response2 = await fetch(
      `https://genshin.jmp.blue/characters/${mySearch}/portrait`
    );

    if (!response.ok || !response2.ok) {
      throw new Error('Could not fetch resource');
    }

    const data = await response.json();
    const dataArray3 = Object.values(data);
    //console.log(dataArray3);

    const imgData = await response2.blob();
    const url = URL.createObjectURL(imgData);

    // search output - text
    const searchOutput = document.getElementById('searchOutput');
    searchOutput.innerHTML = `
    ${dataArray3[0]}<br/>
    "${dataArray3[1]}"<br/>
    ${dataArray3[4]}<br/>
    Nation: ${dataArray3[5]}<br/>
    Vision: ${dataArray3[2]}<br/>
    Weapon: ${dataArray3[3]}<br/>
    Rarity: ${dataArray3[7]}⭐<br/>
    Description: ${dataArray3[11]}`;

    searchOutput.style.maxWidth = '100%';
    searchOutput.style.borderRadius = '4rem';
    searchOutput.style.padding = '3rem';
    searchOutput.style.backgroundColor = 'var(--grid)';
    searchOutput.style.color = 'var(--color-g)';

    // search output - image
    const imgContainer = document.createElement('div');
    imgContainer.className = 'char-img-container';
    imgContainer.style.maxWidth = '100%';

    const img = document.createElement('img');
    img.style.width = '300px';
    img.style.height = '450px';
    img.style.objectFit = 'contain';
    img.src = url;

    // image to container - container to searchOutput
    imgContainer.appendChild(img);
    searchOutput.append(imgContainer);

    //console.log(data);
  } catch (error) {
    console.log(error);
  }
  mySearch.value = '';
}

const searchBtn = document
  .getElementById('searchBtn')
  .addEventListener('click', fetchData);
