const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
  loading();
  const proxyUrl = "https://whispering-tor-04671.herokuapp.com/";
  const apiUrl =
    "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=1";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // If Author is blank, add 'Unknown'
    if (data.text === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.text;
    }
    // Reduce font size for long quotes
    if (data.text.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.type;
    // Stop Loader, Show Quote
    complete();
  } catch (error) {
    getQuote();
  }
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);

// On Load
getQuote();
