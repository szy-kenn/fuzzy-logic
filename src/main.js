import FuzzyLogic from "./FuzzyLogic";
import Trapmf from "./Trapmf";
import Trimf from "./Trimf";
import { Point } from "./utils";
import "./slider.css";

// temperature 
const freezingTrapMf = new Trapmf(Point(0, 0), Point(0, 1), Point(30, 1), Point(50, 0));
const coolTriMf = new Trimf(Point(30, 0), Point(50, 1), Point(70, 0));
const warmTriMf = new Trimf(Point(50, 0), Point(70, 1), Point(90, 0));
const hotTrapMf = new Trapmf(Point(70, 0), Point(90, 1), Point(110, 1), Point(110, 0));

// cloud cover
const sunnyTrapMf = new Trapmf(Point(0, 0), Point(0, 1), Point(20, 1), Point(40, 0));
const partlyCloudlyTriMf = new Trimf(Point(20, 0), Point(50, 1), Point(80, 0));
const overcastTrapMf = new Trapmf(Point(60, 0), Point(80, 1), Point(100, 1), Point(100, 0));

// speed
const slowTrapMf = new Trapmf(Point(0, 0), Point(0, 1), Point(25, 1), Point(75, 0));
const fastTrapMf = new Trapmf(Point(25, 0), Point(75, 1), Point(100, 1), Point(100, 0));

const fuzzyLogic = new FuzzyLogic(
  freezingTrapMf, coolTriMf, warmTriMf, hotTrapMf, // temperatures
  sunnyTrapMf, partlyCloudlyTriMf, overcastTrapMf, // cloud covers
  slowTrapMf, fastTrapMf, // speeds
);

// get sliders elements
const tempValueSlider = document.getElementById("tempValueSlider");
const cloudCoverValueSlider = document.getElementById("cloudCoverValueSlider");

tempValueSlider.addEventListener("input", (e) => {
  fuzzyLogic.getInput(e.target.value, cloudCoverValueSlider.value);
  document.querySelector(".temp-value-text").textContent = e.target.value;
});

cloudCoverValueSlider.addEventListener("input", (e) => {
  fuzzyLogic.getInput(tempValueSlider.value, e.target.value);
  document.querySelector(".cloud-cover-value-text").textContent = e.target.value;
});

fuzzyLogic.initialize();
