"use strict";

(() => {
  // Store the API URL
  const url =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart";

  // Select the HTML elements
  const setupElement = document.querySelector("#jokeSetup");
  const deliveryElement = document.querySelector("#jokeDelivery");
  const buttonElement = document.querySelector("#loadAnother");

  // Function to handle errors
  const handleError = (error) => {
    console.error("Unable to retrieve joke:", error);
    setupElement.textContent = "Sorry, we could not load a joke.";
    deliveryElement.textContent = "Please try again.";
  };

  // Reusable function to fetch a joke
  const fetchJoke = () => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        return response.json();
      })

      .then((data) => {
        if (data.error || !data.setup || !data.delivery) {
          throw new Error("The API returned an invalid joke.");
        }

        setupElement.textContent = data.setup;
        deliveryElement.textContent = data.delivery;
      })

      .catch((error) => handleError(error));
  };
  // Load a joke automatically when the page loads
  fetchJoke();

  // Load another joke when the button is clicked
  buttonElement.addEventListener("click", fetchJoke);
})();
