// Fetch data from the API
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

              const characterIcon = document.createElement("img");
              characterIcon.src = imageUrl;
              characterIcon.alt = char;

              const charName = document.createElement("span");
              charName.textContent = char;
              charName.className = 'character-name';

              listItem.appendChild(characterIcon);
              listItem.appendChild(charName);
              characterList.appendChild(listItem);
            });
        });
      }
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
