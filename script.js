const url = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';

// DOM Elements
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteButton = document.getElementById('newQuote');
const copyQuoteButton = document.getElementById('copyQuote');
const shareTwitterButton = document.getElementById('shareTwitter');
const bodyElement = document.getElementById('body');

// Fetch a random quote
async function fetchQuote() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.success) {
      const quote = data.data.content;
      const author = data.data.author;
      quoteElement.textContent = `"${quote}"`;
      authorElement.textContent = `— ${author}`;
    } else {
      throw new Error('Failed to fetch quote');
    }
  } catch (error) {
    console.error(error);
    quoteElement.textContent = 'Failed to load quote. Please try again.';
    authorElement.textContent = '';
  }
}

// Copy quote to clipboard
function copyQuoteToClipboard() {
  const quote = quoteElement.textContent;
  const author = authorElement.textContent;
  const textToCopy = `${quote}\n${author}`;
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert('Quote copied to clipboard!');
  });
}

// Share quote on Twitter
function shareOnTwitter() {
  const quote = quoteElement.textContent;
  const author = authorElement.textContent;
  const tweetText = encodeURIComponent(`${quote}\n— ${author}`);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteButton.addEventListener('click', fetchQuote);
copyQuoteButton.addEventListener('click', copyQuoteToClipboard);
shareTwitterButton.addEventListener('click', shareOnTwitter);

// Initial Load
fetchQuote();
setRandomBackground();
