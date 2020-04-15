var votingRounds = 25;
var currentVotingRounds = 0;

function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.numClicks = 0;
  this.numViews = 0;
  this.imageElement = document.createElement('img');
};

Product.allProducts = [];
Product.productsDisplayed = [];
Product.prevProductsDisplayed = [];

// Returns a new element that is appended to a list
Product.prototype.render = function () {
  var renderElement = document.createElement('li');
  figureElement = document.createElement('figure');
  figCapElement = document.createElement('figcaption');

  var newClickEvent = this.clickEvent.bind(this);

  figCapElement.textContent = this.name + ' has ' + this.numViews + ' views.';

  this.imageElement.setAttribute('src', this.imgPath);
  this.imageElement.addEventListener('click', newClickEvent);

  figureElement.appendChild(this.imageElement);
  figureElement.appendChild(figCapElement);
  renderElement.appendChild(figureElement);
  return renderElement;
};

// Calls event for when image is clicked
Product.prototype.clickEvent = function () {
  currentVotingRounds++;
  this.numClicks++;
  console.log(this.name + ' was clicked ' + this.numClicks);
  generateProductImages();
};

// Renders the results page
renderResults = function () {
  var productList = document.getElementById('product-list');
  productList.innerHTML = '';

  for (let i = 0; i < Product.allProducts.length; i++) {
    console.log(Product.allProducts[i].imageElement + ' ' + Product.allProducts[i].name + ' ' + i);

    Product.allProducts[i].imageElement.removeEventListener('click', Product.allProducts[i].clickEvent);

    var renderElement = document.createElement('li');
    var figureElement = document.createElement('figure');
    var figCapElement = document.createElement('figcaption');

    figCapElement.textContent = Product.allProducts[i].name + ' had ' + Product.allProducts[i].numClicks + ' votes and was shown ' + Product.allProducts[i].numViews + ' times.'
    Product.allProducts[i].imageElement.setAttribute('src', Product.allProducts[i].imgPath);

    figureElement.appendChild(Product.allProducts[i].imageElement);
    figureElement.appendChild(figCapElement);
    renderElement.appendChild(figureElement);
    productList.appendChild(renderElement);

    generateChartDisplay();
  }
};

// Empties all displayed products back into main products array
emptyArrayToOtherArray = function (arrayToEmpty, arrayToPushTo) {
  while (arrayToEmpty > 0) {
    var nextElement = arrayToEmpty.pop();
    arrayToPushTo.push(nextElement);
    console.log(arrayToPushTo.length);
  }
}

// Generates a new set of product images
generateProductImages = function () {
  if (currentVotingRounds >= votingRounds) {
    emptyArrayToOtherArray(Product.productsDisplayed, Product.allProducts);
    emptyArrayToOtherArray(Product.prevProductsDisplayed, Product.allProducts);
    renderResults();
    return;
  }

  var randomProductIndex;

  if(Product.prevProductsDisplayed.length > 0) emptyArrayToOtherArray(Product.prevProductsDisplayed, Product.allProducts);
  emptyArrayToOtherArray(Product.productsDisplayed, Product.prevProductsDisplayed);

  console.log('Previous products: ' + Product.prevProductsDisplayed);
  console.log('Products to display: ' + Product.productsDisplayed);
  console.log('All products: ' + Product.productsDisplayed);

  var productList = document.getElementById('product-list');
  productList.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    randomProductIndex = Math.round(Math.floor(Math.random() * Product.allProducts.length));

    var productToDisplay = Product.allProducts[randomProductIndex];
    Product.allProducts.splice(randomProductIndex, 1);
    Product.productsDisplayed.push(productToDisplay);

    productToDisplay.numViews++;
    productList.appendChild(productToDisplay.render());
  }
};

// Generates a chart display
function generateChartDisplay() {
  var chart, productNames = [], productVotes = [];
  var productChart = document.getElementById('product-chart');


  for(var i = 0; i < Product.allProducts.length; i++) {
    productNames.push(Product.allProducts[i].name);
    productVotes.push(Product.allProducts[i].numClicks);
  }

  chart = new Chart(productChart, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}


Product.allProducts.push(new Product('Droid Bag', 'img/bag.jpg'));
Product.allProducts.push(new Product('Banana Slicer', 'img/banana.jpg'));
Product.allProducts.push(new Product('Bathroom Selfie Stick', 'img/bathroom.jpg'));
Product.allProducts.push(new Product('Running Rain Boots', 'img/boots.jpg'));
Product.allProducts.push(new Product('All-In-One Breakfast Kitchen', 'img/breakfast.jpg'));
Product.allProducts.push(new Product('Meatball Bubblegum', 'img/bubblegum.jpg'));
// Product.allProducts.push(new Product('Best Chair', 'img/chair.jpg'));
// Product.allProducts.push(new Product('Effigy Of The High Priest', 'img/cthulhu.jpg'));
// Product.allProducts.push(new Product('Duck Mask For Dogs', 'img/dog-duck.jpg'));
// Product.allProducts.push(new Product('Dragon Meat', 'img/dragon.jpg'));
// Product.allProducts.push(new Product('Silverware Pen Caps', 'img/pen.jpg'));
// Product.allProducts.push(new Product('Pet Sweep', 'img/pet-sweep.jpg'));
// Product.allProducts.push(new Product('Pizza Scissors', 'img/scissors.jpg'));
// Product.allProducts.push(new Product('Shark Sleeping Bag', 'img/shark.jpg'));
// Product.allProducts.push(new Product('Baby Sweep', 'img/sweep.png'));
// Product.allProducts.push(new Product('Taun-Taun Sleeping Bag', 'img/tauntaun.jpg'));
// Product.allProducts.push(new Product('Unicorn Meat', 'img/unicorn.jpg'));
// Product.allProducts.push(new Product('Thumb Drive From The Deep', 'img/usb.gif'));
// Product.allProducts.push(new Product('Self-Refilling Water Can', 'img/water-can.jpg'));
// Product.allProducts.push(new Product('Impossible Wine Glass', 'img/wine-glass.jpg'));
generateProductImages();