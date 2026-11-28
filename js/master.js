// change the background imag
let landPage = document.querySelector(".landing-page");

let imgArray = [
  "landing-back2.jpg",
  "landing-back3.jpg",
  "landing-back4.jpg",
  "landing-back5.jpg",
];

let backgroundOption;

let chngeBackStatus = localStorage.getItem("cha-back-stat");
if (chngeBackStatus !== null) {
  backgroundOption = chngeBackStatus;
}

let randomizeInterval;
function randomizeImages() {
  if (backgroundOption === "true") {
    randomizeInterval = setInterval(() => {
      let randNumber = Math.floor(Math.random() * imgArray.length);
      landPage.style.backgroundImage = `url("images/${imgArray[randNumber]}")`;
    }, 10000);
  } else {
    let staticBackGround = localStorage.getItem("back-image");
    if (staticBackGround !== null) {
      landPage.style.backgroundImage = staticBackGround;
    }
  }
}
randomizeImages();

// show the setting list
let settingList = document.querySelector(".setting-box");
let settingButton = document.querySelector(".setting-button");

settingButton.onclick = function () {
  this.classList.toggle("fa-spin");
  settingList.classList.toggle("show");
  // تذكر حطينا توجيل عشان اذا موجود يحذفه واذا مش موجود يحطه
};

// check if the user save color in local storage
let mainColor = localStorage.getItem("main-color");
let lisElement = localStorage.getItem("colors-html");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
}
let colorsList = document.querySelector(".colors-list");
if (lisElement !== null) {
  colorsList.innerHTML = lisElement;
}

let randomElement = localStorage.getItem("randomst-html");
let randomcontainer = document.querySelector(".random-background");
if (randomElement !== null) {
  randomcontainer.innerHTML = randomElement;
}

// change the main color
const colorList = document.querySelectorAll(".option-box .colors-list li");

colorList.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("main-color", e.target.dataset.color);
    colorList.forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.add("active");
    localStorage.setItem("colors-html", colorsList.innerHTML);
  });
});

// change the background status
const randomBackEl = document.querySelectorAll(
  ".option-box .random-background span"
);

randomBackEl.forEach((sp) => {
  sp.addEventListener("click", (e) => {
    randomBackEl.forEach((span) => {
      span.classList.remove("active");
    });
    e.target.classList.add("active");
    localStorage.setItem("randomst-html", randomcontainer.innerHTML);
    if (e.target.dataset.background === "yes") {
      backgroundOption = "true";
      randomizeImages();
      localStorage.setItem("cha-back-stat", true);
    } else {
      backgroundOption = "false";
      clearInterval(randomizeInterval);
      localStorage.setItem("cha-back-stat", false);
      localStorage.setItem("back-image", landPage.style.backgroundImage);
    }
  });
});

// full the skill progress when the user scroll
let ourSkillsSection = document.querySelector(".our-skills");

// when the user scroll
window.onscroll = function () {
  // جلب المسافة بين اعلى الصفحة واعلى العنصر
  let skillOfsitTop = ourSkillsSection.offsetTop;

  // حساب ارتفاع قسم المهارات من بدايته الى نهايته
  let skillsOuterHeight = ourSkillsSection.offsetHeight;

  // حساب طول الصفحة ككل
  let windoHeight = this.innerHeight;

  // حساب كم بكسل عمل المستخدم سكرول
  let windoScrollTop = this.scrollY;

  if (windoScrollTop >= skillOfsitTop + skillsOuterHeight - windoHeight) {
    let allSkills = document.querySelectorAll(
      ".our-skills .container .skill-box .skill-progres span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progres;
    });
  }
};

// our gallary
let gallary = document.querySelectorAll(".gallary img");

gallary.forEach((img) => {
  img.addEventListener("click", (e) => {
    //create overlay element
    let overlay = document.createElement("div");

    //add class to overlay element
    overlay.className = "img-overlay";

    // add the element to the body
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");

    popupBox.className = "popup-box";

    let popupImg = document.createElement("img");

    popupImg.src = img.src;

    popupBox.appendChild(popupImg);

    document.body.appendChild(popupBox);

    if(img.alt !== ""){

      let popupHid = document.createElement('h3');

      let hidText = document.createTextNode(img.alt);

      popupHid.appendChild(hidText);

      popupBox.appendChild(popupHid);

    }
    
    let closeBox = document.createElement("div");
    closeBox.className = "close-box";

    let closeBoxText = document.createTextNode("X");

    closeBox.appendChild(closeBoxText);

    popupBox.appendChild(closeBox);

    closeBox.addEventListener("click" , (e)=>{

      document.body.removeChild(popupBox);
      document.body.removeChild(overlay);
    });

  });
});


// nav bollit sitting 
const bollits = document.querySelectorAll(".nav-bolits .bolit");

// links sitting
const links = document.querySelectorAll(".header-area ul li a");

function goSomeWhere(elements){

elements.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});
};
goSomeWhere(bollits);
goSomeWhere(links);
