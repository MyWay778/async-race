import "./style.scss";
import ninjaImg from "./ninja.png";

const test = document.createElement("div");
test.classList.add("test");
test.textContent = "dsdd321321a";
const image = document.createElement("img");
image.src = ninjaImg;

document.body.append(test, image);
