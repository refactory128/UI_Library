import leftIconSrc from "./imgSliderIcons/arrow_left_black_48dp.svg";
import rightIconSrc from "./imgSliderIcons/arrow_right_black_48dp.svg";
import emptyDotIconSrc from "./imgSliderIcons/dot_Empty.svg";
import filledDotIconSrc from "./imgSliderIcons/dot_Filled.svg";

class imageData {
  constructor(imageSourceArray = []) {
    this.imageSourceArray = imageSourceArray;
    this.currentImage = this.imageSourceArray.length;
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

  const emptyDot = new Image();
  emptyDot.src = emptyDotIconSrc;
  dotsDiv.appendChild(emptyDot);

  const filledDot = new Image();
  filledDot.src = filledDotIconSrc;
  dotsDiv.appendChild(filledDot);

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
