import leftIconSrc from "./imgSliderIcons/arrow_left_black_48dp.svg";
import rightIconSrc from "./imgSliderIcons/arrow_right_black_48dp.svg";
import emptyDotIconSrc from "./imgSliderIcons/dot_Empty.svg";
import filledDotIconSrc from "./imgSliderIcons/dot_Filled.svg";

class imageData {
  constructor(imageSourceArray = []) {
    this.imageSourceArray = imageSourceArray;
    this.currentImage = this.imageSourceArray.length;
    this.getImageNumber = this.getImageNumber.bind(this);
  }

  getImageNumber(imageNumber) {
    if (imageNumber >= 0 && imageNumber < this.imageSourceArray.length) {
      return this.imageSourceArray[imageNumber];
    }
    return 0;
  }
}

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
    for (let i = 0; i < numberOfDots; i++) {
      this.elements.push(new dot());
      this.domElement.appendChild(this.elements[i].getDomImageElement());
      //this.clearAll();

      this.elements[i]
        .getDomImageElement()
        .addEventListener("click", function (e) {
          //how do I pass the dots "this" element into the add event listener function function?
          //this.clearAll();

          /////
          //this.elements[i].getDomImageElement().fill();
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

  const leftArrow = new Image();
  leftArrow.src = leftIconSrc;
  leftArrow.addEventListener("click", function (e) {
    canvas.src = sliderData.getPreviousImage();
    console.log(canvas.src);
    console.log(sliderData.currentImage);
  });
  dotsDiv.appendChild(leftArrow);

  const dotsControl = new dots(
    sliderData.getNumberOfImages(),
    sliderData.getImageNumber,
    canvas
    //how do we get the image src back to the canvas
  );
  dotsDiv.appendChild(dotsControl.getDomElement());

  const rightArrow = new Image();
  rightArrow.src = rightIconSrc;
  rightArrow.addEventListener("click", function (e) {
    canvas.src = sliderData.getNextImage();
    console.log(canvas.src);
    console.log(sliderData.currentImage);
  });
  dotsDiv.appendChild(rightArrow);

  container.appendChild(dotsDiv);

  return container;
}
