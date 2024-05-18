document.addEventListener("DOMContentLoaded", function() {
    const projects = document.querySelectorAll(".project");
    const contents = document.querySelectorAll(".project-content");
  
    projects.forEach((project, index) => {
      project.addEventListener("click", () => {
        contents.forEach(content => content.classList.remove("active"));
        document.getElementById(`project${index + 1}-content`).classList.add("active");
      });
    });
  });


 // Arrays for each project's images
const imagesProject2 = [];
for (let i = 1; i <= 4; i++) {
  imagesProject2.push(`./image/cms-${i}.jpg`);
}

const imagesProject3 = [];
for (let i = 1; i <= 4; i++) {
  imagesProject3.push(`./image/w-${i}.png`);
}

// Current indexes for each project's slideshow
let currentIndexProject2 = 0;
let currentIndexProject3 = 0;

// Elements for each project's images
const imageElementProject2 = document.getElementById("project2-image");
const imageElementProject3 = document.getElementById("project3-image");

// Functions to show images for each project
function showImageProject2(index) {
  imageElementProject2.src = imagesProject2[index];
}

function showImageProject3(index) {
  imageElementProject3.src = imagesProject3[index];
}

// Functions to navigate images for Project 2
function nextImageProject2() {
  currentIndexProject2 = (currentIndexProject2 + 1) % imagesProject2.length;
  showImageProject2(currentIndexProject2);
}

function previousImageProject2() {
  currentIndexProject2 = (currentIndexProject2 - 1 + imagesProject2.length) % imagesProject2.length;
  showImageProject2(currentIndexProject2);
}

// Functions to navigate images for Project 3
function nextImageProject3() {
  currentIndexProject3 = (currentIndexProject3 + 1) % imagesProject3.length;
  showImageProject3(currentIndexProject3);
}

function previousImageProject3() {
  currentIndexProject3 = (currentIndexProject3 - 1 + imagesProject3.length) % imagesProject3.length;
  showImageProject3(currentIndexProject3);
}

// Automatically slide to the next image every 5 seconds for each project
setInterval(nextImageProject2, 2000);
setInterval(nextImageProject3, 2000);


