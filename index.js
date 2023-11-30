// typedJs
document.addEventListener('DOMContentLoaded', function() {
  var typed = new Typed("#typed-text", {
    strings: ["Amarjeet Kumar", "Web Learner"],
    typeSpeed: 50,
    backSpeed: 100,
    loop: true
  });
});

// smooth-scroll
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.smooth-scroll');

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default link behavior (direct jumping to the target)

      const targetSection = document.querySelector(link.getAttribute('href'));
      const headerOffset = 100; // Adjust this value if you have a fixed header (to consider the height of the header)

      const targetPosition = targetSection.getBoundingClientRect().top;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - headerOffset; // Adjust the distance to consider the header height

      const duration = 1000; // Duration of the smooth scroll in milliseconds

      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      function ease(t, b, c, d) {
        // Easing function (linear in this example)
        t /= d;
        return c * t + b;
      }

      requestAnimationFrame(animation);
    });
  });
});

// header section color
const headerSection = document.querySelector(".header-bg");
const topHeader = document.querySelector(".top-header");

window.addEventListener("scroll", function() {
  const headerHeight = headerSection.offsetHeight; // Get the height of the header section

  // Check if the user has scrolled past the header section
  if (window.scrollY >= headerHeight) {
    // Add a new class to change the top-header color
    topHeader.classList.add("header-scrolled");
  } else {
    // Remove the class if the user scrolls back to the header section
    topHeader.classList.remove("header-scrolled");
  }
});

// random quote
const quoteUrl = "https://type.fit/api/quotes";
const text = document.getElementById("quote");
const author = document.getElementById("author");
const share = document.getElementById("share");

let quotes = "";
let authorName = "";

function randomCall() {
  getQuote();
}

const tweetNow = () => {
  let tweet = `https://twitter.com/share?text=${encodeURIComponent(quotes)}%20%0Aby:%20${encodeURIComponent(authorName)}`;
  window.open(tweet);
};

async function getQuote() {
  let quotesData = await fetch(quoteUrl);
  let responseData = await quotesData.json(); // Rename 'data' to 'responseData'
  var randomNum = Math.floor(Math.random() * responseData.length);
  quotes = responseData[randomNum].text;
  authorName = responseData[randomNum].author;
  if (authorName === null) {
    authorName = "unKnown";
  } else if (authorName.includes(", type.fit")) {
    authorName = authorName.replace(", type.fit", "").trim();
  } else if (authorName.includes("type.fit")) {
    authorName = authorName.replace("type.fit", "UnKnown").trim();
  }
  text.innerHTML = quotes;
  author.innerHTML = authorName;
}

getQuote();
share.onclick = tweetNow;

// certificate
// Auto-slide function
let currentIndex = 0;
const slides = document.querySelectorAll("input[name='s']");
const slideCount = slides.length;

const autoSlide = () => {
  slides[currentIndex].checked = true;
  currentIndex = (currentIndex + 1) % slideCount;
};

// Set auto-slide interval (5000 ms = 5 seconds)
const autoSlideInterval = setInterval(autoSlide, 2000);

// Stop auto-slide when user interacts with the slider
document.querySelector(".certification-slider").addEventListener("click", () => {
  clearInterval(autoSlideInterval);
});

// date
const options = { weekday: 'long', month: 'long', day: 'numeric' };
const today = new Date();
const kindOfDay = today.toLocaleDateString("en-US", options);
document.getElementById('kindOfDay').innerText = kindOfDay;

// load more
document.addEventListener('DOMContentLoaded', function () {
  const projects = document.querySelectorAll('.project');
  const loadMoreButton = document.getElementById('loadMoreButton');
  const projectsPerPage = 3;
  let visibleProjects = projectsPerPage;

  // Initially hide projects beyond the first page
  hideProjects();

  loadMoreButton.addEventListener('click', function () {
      visibleProjects += projectsPerPage;
      updateVisibility();

      // Hide the "Load More" button if there are no more projects to show
      if (visibleProjects >= projects.length) {
          loadMoreButton.style.display = 'none';
      }
  });

  function hideProjects() {
      projects.forEach((project, index) => {
          if (index >= visibleProjects) {
              project.style.display = 'none';
          }
      });
  }

  function updateVisibility() {
      projects.forEach((project, index) => {
          if (index < visibleProjects) {
              project.style.display = 'grid'; // Assuming 'grid' is the default display for your projects
          }
      });
  }
});
