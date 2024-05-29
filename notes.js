fetch("https://genshin.jmp.blue/materials/weapon-ascension")
  .then((res) => res.json())
  .then((data) => {
    //console.log(data);

    const dataArray2 = Object.values(data);
    //console.log(dataArray2);

    dataArray2.forEach((weapon) => {
      let currentDayWeapons = document.getElementById("currentDayWeapons");
      if (weapon.availability.includes(week[dayIndex])) {
        currentDayWeapons = fetch("https://genshin.jmp.blue/weapons/deathmatch/icon")
        .then(response => response.blob())
        .then(imageBlob => {
          const imageUrl = URL.createObjectURL(imageBlob);
          const imageElement = document.createElement('img');
          imageElement.src = imageUrl;
          imageElement.style.width = '50px';
          imageElement.style.borderRadius = '10px';
          document.body.appendChild(imageElement);
        })
      }
    });
    if (!Array.isArray(data)) {
      return false;
    }
  })
  .catch((error) => console.log(error));


// ORIGINAL - SUCCESSFUL

fetch("https://genshin.jmp.blue/materials/weapon-ascension")
  .then((res) => res.json())
  .then((data) => {
    //console.log(data);

    const dataArray2 = Object.values(data);
    //console.log(dataArray2);

    dataArray2.forEach((weapon) => {
      let currentDayWeapons = document.getElementById("currentDayWeapons");
      if (weapon.availability.includes(week[dayIndex])) {
        currentDayWeapons.innerHTML += `<h4>${weapon.items[0].name}</h4>`
        /*
        <p>${weapon.weapons
          .map(
            (weapon) =>
              weapon.charAt(0).toUpperCase() +
              weapon.replace(/-/g, " ").slice(1)
          )
          .join(" | ")}
        </p>`;*/
      }
    });
    if (!Array.isArray(data)) {
      return false;
    }
  })
  .catch((error) => console.log(error));

  // LATEST - ALL IMGS AT BOTTOM, NOT BENEATH EACH H4 NAME

fetch("https://genshin.jmp.blue/materials/weapon-ascension")
.then((res) => res.json())
.then((data) => {
  const dataArray2 = Object.values(data);
  //console.log(dataArray2[1]);

  dataArray2.forEach((mat) => {
    if (mat.availability.includes(week[dayIndex])) {
      let currentDayWeapons = document.getElementById("currentDayWeapons");
      currentDayWeapons.innerHTML += `<h4>${mat.items[0].name}</h4>`;
      //console.log(mat.items[1]);
    }
    let todaysWeapons = mat.weapons;
    console.log(todaysWeapons);

    todaysWeapons.forEach((weapon) => {
      const url = `https://genshin.jmp.blue/weapons/${weapon}/icon`;
      const imageElement = document.createElement('img');
      imageElement.style.width = '50px';
      imageElement.style.borderRadius = '10px';
    
      fetch(`https://genshin.jmp.blue/weapons/${weapon}`)
        .then((res) => res.json())
        .then((data) => {
          const dataArray3 = Object.values(data)[0];
          if (weapon === "sword-of-narzissenkreuz") {
            todaysWeapons = todaysWeapons.filter((w) => w !== weapon);
          } else{
            imageElement.src = url;
            currentDayWeapons.appendChild(imageElement);
          }
        })
    });
  });

  if (!Array.isArray(data)) {
    return false;
  }
})
.catch((error) => console.log(error));

// CHARACTERS

fetch("https://genshin.jmp.blue/materials/talent-book")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    // console.log(Array.isArray(data));

    // Convert the object's values into an array
    const dataArray = Object.values(data);
    //console.log(dataArray);

    dataArray.forEach((book) => {
      if (book.availability.includes(week[dayIndex])) {
        let currentDayBooks = document.getElementById("currentDayBooks");
        currentDayBooks.innerHTML += `<h4>${
          book.items[0].name
        }</h4> <p>${book.characters
          .map(
            (character) =>
              character.charAt(0).toUpperCase() + character.slice(1)
          )
          .join(" | ")}</p>`;
      }

      let todaysCharacters = book.characters;
      // console.log(todaysCharacters);

      todaysCharacters.forEach((char) => {
        // console.log(book)
        console.log('Fetching character icon for ${char}');

        const url2 = `https://genshin.jmp.blue/characters/${char}/icon`;
        const charImg = document.createElement('img');
        charImg.src = url2;
        charImg.style.width = '50px';
        charImg.alt = char;
        currentDayBooks.appendChild(charImg);
      });
    });

    if (!Array.isArray(data)) {
      return false;
    }
  })
  .catch((error) => console.log(error));

