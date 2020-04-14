/*
  === TO DO (Lab Planning) ===
  PART 1
  1. Create Product constructor
    a. name
    b. img file path
  2. GenerateProductImages method
  3. Attach eventlistener to image sections; when user clicks product, they generate three new products

  PART 2
  1. Define property in Product for how many times a product is clicked
  2. Update property for each time user selects product

  PART 3
  1. User is presented with 25 rounds of voting
  2. Keep voting rounds in a variable

  PART 4
  1. Create property that tracks all products being considered
  2. Remove eventlisteners after voting is done
  3. Display list of products with votes by each of them
*/

var votingRounds = 25;
var currentVotingRounds = 0;

var allProducts = [];
var productsDisplayed = [];


function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.numClicks = 0;
  this.numViews = 0;
  this.imageElement;
};

Product.prototype.render = function () {
  var renderElement = document.createElement('li');
  this.imageElement = document.createElement('img');

  var newClickEvent = this.clickEvent.bind(this);

  this.imageElement.setAttribute('src', this.imgPath);
  this.imageElement.addEventListener('click', newClickEvent);

  renderElement.appendChild(this.imageElement);
  return renderElement;
};

Product.prototype.clickEvent = function () {
  currentVotingRounds++;
  this.numClicks++;
  console.log(this.name + ' was clicked ' + this.numClicks);
  generateProductImages();
};

renderResults = function() {
  var productList = document.getElementById('product-list');
  productList.innerHTML = '';

  for (let i = 0; i < allProducts.length; i++) {
    document.removeEventListener('click', allProducts[i].imageElement.clickEvent);

    var renderElement = document.createElement('li');
    var figureElement = document.createElement('figure');
    allProducts[i].imageElement = document.createElement('img');

    renderElement.textContent = allProducts[i].name + ' had ' + allProducts[i].numClicks + ' votes and was shown ' + allProducts[i].numViews + ' times.'
    allProducts[i].imageElement.setAttribute('src', allProducts[i].imgPath);

    renderElement.appendChild(allProducts[i].imageElement);
    productList.appendChild(renderElement);
  }
};

emptyDisplayedProductsToAllProducts = function() {
  while(productsDisplayed.length > 0) {
    var nextProduct = productsDisplayed.pop();
    allProducts.push(nextProduct);
  }
}

generateProductImages = function () {
  if(currentVotingRounds >= votingRounds) {
    emptyDisplayedProductsToAllProducts();
    renderResults();
    return;
  }
  
  var productList = document.getElementById('product-list');
  productList.innerHTML = '';

  emptyDisplayedProductsToAllProducts();

  for (let i = 0; i < 3; i++) {
    var randomProductIndex = Math.round(Math.floor(Math.random() * allProducts.length));
    console.log(randomProductIndex);

    var productToDisplay = allProducts[randomProductIndex];
    allProducts.splice(randomProductIndex, 1);

    console.log(allProducts);

    productToDisplay.numViews++;
    productsDisplayed.push(productToDisplay);
    productList.appendChild(productToDisplay.render());
  }
};

allProducts.push(new Product('bag', 'img/bag.jpg'));
allProducts.push(new Product('banana', 'img/banana.jpg'));
allProducts.push(new Product('banana', 'img/banana.jpg'));
allProducts.push(new Product('banana', 'img/banana.jpg'));

generateProductImages();