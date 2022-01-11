import leftIconSrc from "./imgSliderIcons/arrow_left_black_48dp.svg";
import rightIconSrc from "./imgSliderIcons/arrow_right_black_48dp.svg";
import emptyDotIconSrc from "./imgSliderIcons/dot_Empty.svg";
import filledDotIconSrc from "./imgSliderIcons/dot_Filled.svg";

class imageData {
  constructor(imageSourceArray = []) {
    this.imageSourceArray = imageSourceArray;
    this.currentImage = this.imageSourceArray.length;
    this.getImage = this.getImage.bind(this);
  }

  getImage(imageNumber) {
    if (imageNumber >= 0 && imageNumber < this.imageSourceArray.length) {
      return this.imageSourceArray[imageNumber];
    }
    return 0;
  }
}

imageData.prototype.getImageNumber = function () {
  console.log(this.currentImage);
  return this.currentImage;
};

imageData.prototype.getNextImage = function () {
  if (this.currentImage + 1 >= this.imageSourceArray.length) {
    this.currentImage = 0;
  } else {
    this.currentImage++;
  }

  return this.imageSourceArray[this.currentImage];
};

imageData.prototype.getPreviousImage = function () {
  if (this.currentImage - 1 < 0) {
    this.currentImage = this.imageSourceArray.length - 1;
  } else {
    this.currentImage--;
  }

  return this.imageSourceArray[this.currentImage];
};

imageData.prototype.getNumberOfImages = function () {
  return this.imageSourceArray.length;
};
/*
imageData.prototype.getImageNumber = function (imageNumber) {
  if (imageNumber >= 0 && imageNumber < this.imageSourceArray.length) {
    return this.imageSourceArray[imageNumber];
  }
  return 0;
};
*/

/////////////////////
//Dots

class dot {
  constructor() {
    this.domImageElement = new Image();
    this.domImageElement.src = emptyDotIconSrc;
    this.filled = 0;
  }
}

dot.prototype.getDomImageElement = function () {
  return this.domImageElement;
};

dot.prototype.fill = function () {
  this.filled = 1;
  this.domImageElement.src = filledDotIconSrc;
};

dot.prototype.clear = function () {
  this.filled = 0;
  this.domImageElement.src = emptyDotIconSrc;
};

dot.prototype.toggle = function () {
  if (this.filled === 0) {
    this.fill();
  } else {
    this.clear();
  }
};
//////////////
// Dots

class dots {
  constructor(numberOfDots, dotClickCallback, canvas) {
    this.elements = [];
    this.domElement = document.createElement("div");
    this.dotClickCallback;
    this.canvas;

    for (let i = 0; i < numberOfDots; i++) {
      this.elements.push(new dot());
      this.domElement.appendChild(this.elements[i].getDomImageElement());
      let self = this;
      // handle clicking one of the dots
      this.elements[i]
        .getDomImageElement()
        .addEventListener("click", function (e) {
          self.update(i);
          canvas.src = dotClickCallback(i);
        });

      //fill the first dot

      if (i === 0) {
        this.elements[i].fill();
      } else {
        this.elements[i].clear();
      }
    }
  }
}

dots.prototype.update = function (currentSelection) {
  this.clearAll();
  console.log("update = " + currentSelection);
  this.elements[currentSelection].fill();
};

dots.prototype.getDomElement = function () {
  return this.domElement;
};

dots.prototype.clearAll = function () {
  for (let i = 0; i < this.elements.length; i++) {
    console.log("clearAll Function");
    this.elements[i].clear();
  }
};

///////////////////////

export default function imgSlider(imageSourceArray) {
  const sliderData = new imageData(imageSourceArray);

  const container = document.createElement("div");

  const sliderDiv = document.createElement("div");
  container.appendChild(sliderDiv);

  const canvas = document.createElement("img");
  canvas.src = sliderData.getNextImage();
  canvas.style.width = "100vw";
  /*
  setInterval(
    function (canvas, sliderData) {
      canvas.src = sliderData.getNextImage();
      console.log(canvas.src);
      console.log(sliderData.currentImage);
    },
    5000,
    canvas,
    sliderData
  );
*/

  sliderDiv.appendChild(canvas);

  const dotsDiv = document.createElement("div");
  dotsDiv.style.display = "flex";
  dotsDiv.style.justifyContent = "center";

  const dotsControl = new dots(
    sliderData.getNumberOfImages(),
    sliderData.getImage,
    canvas
  );

  const leftArrow = new Image();
  leftArrow.src = leftIconSrc;
  leftArrow.addEventListener("click", function (e) {
    canvas.src = sliderData.getPreviousImage();
    console.log(canvas.src);
    console.log(sliderData.currentImage);
    dotsControl.update(sliderData.getImageNumber());
  });
  dotsDiv.appendChild(leftArrow);

  dotsDiv.appendChild(dotsControl.getDomElement());

  const rightArrow = new Image();
  rightArrow.src = rightIconSrc;
  rightArrow.addEventListener("click", function (e) {
    canvas.src = sliderData.getNextImage();
    console.log(canvas.src);
    console.log(sliderData.currentImage);
    dotsControl.update(sliderData.getImageNumber());
  });
  dotsDiv.appendChild(rightArrow);

  container.appendChild(dotsDiv);

  return container;
}
