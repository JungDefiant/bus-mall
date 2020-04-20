# Bus Mall

On this website, there are 25 voting rounds for select products from the popular Bus Mall catalog. Users can vote for their favorite products and view the most popular ones at the end of the voting period.

## Code Example

The code maintains an internal array of Product objects that store how many times it is viewed or clicked. Each time the player selects a picture, the driver of the program, an event function called clickEvent, calls the functions to move the program into a new round of voting. The code for the clickEvent function is given below.

When the image element for a product is clicked, the voting round changes to the next one, the product registers the click, a new set of product images are generated randomly (but never the same in consecutive sets), and all the data is stored into a JSON in the user's local storage.

```javascript
clickEvent = function () {
  currentVotingRounds++;
  this.numClicks++;
  generateProductImages();
  saveProductsToJSON();
};
```

## Motivation

This project exists to show off different Bus Mall products to users and let them vote for their favorite.

## Installation

You can get the project by simply cloning or downloading the repo and opening index.html into a browser.

## API Reference

MDN - Event reference: https://developer.mozilla.org/en-US/docs/Web/Events
W3Schools CSS: https://www.w3schools.com/cssref/default.asp

## License

This project uses the MIT license.
