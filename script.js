//your code here
const imageContainer = document.getElementById("image-container");
const h = document.getElementById("h");
const para = document.getElementById("para");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");

const images = ['img1', 'img2', 'img3', 'img4', 'img5'];
let selected = [];

function shuffleAndRenderImages() {
  const imageClasses = [...images];
  const duplicate = imageClasses[Math.floor(Math.random() * imageClasses.length)];
  imageClasses.push(duplicate);

  imageClasses.sort(() => Math.random() - 0.5); // shuffle

  imageContainer.innerHTML = "";

  imageClasses.forEach((cls, idx) => {
    const img = document.createElement("img");
    img.classList.add(cls);
    img.setAttribute("data-class", cls);
    img.setAttribute("id", "img" + idx);

    img.addEventListener("click", () => handleClick(img));

    imageContainer.appendChild(img);
  });
}

function handleClick(img) {
  if (!img.classList.contains("selected")) {
    if (selected.length < 2) {
      img.classList.add("selected");
      selected.push(img);

      if (selected.length === 1) {
        resetBtn.style.display = "inline-block";
      }

      if (selected.length === 2) {
        verifyBtn.style.display = "inline-block";
      }
    }
  }
}

resetBtn.addEventListener("click", () => {
  selected.forEach(img => img.classList.remove("selected"));
  selected = [];
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  para.textContent = "";
  h.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";
  const [first, second] = selected;

  if (first.getAttribute("data-class") === second.getAttribute("data-class")) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

shuffleAndRenderImages();
