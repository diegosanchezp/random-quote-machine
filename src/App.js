import React , { useState, useEffect } from 'react';
import './App.css';

function App() {
  const {log} = console;
  // Define an array of quotes
  const [quoteArray, setQuoteArr] = useState([]);
  // Define a default quote
  const [quote, setQuote] = useState({
    quote: "Svelte3 is the best frontend framework",
    author: "Diego Sánchez"
  });
  const [qIter, setQuoteIter] = useState({});

  // Fetch quotes when component mounts 
  useEffect(()=>{
    async function fetchData(){
      try{
        const quotes = await fetch(
          'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
        );
        const quoteData = await quotes.json();
        // Set the quotes array
        setQuoteArr(quoteData.quotes);
        // Make an iterator for the quote array
        setQuoteIter(quoteData.quotes[Symbol.iterator]());
      }catch(err){
        log(err);
      }
    }
    fetchData();
  }, []);

  // Get next quote
  function nextQuote(){
    const next = qIter.next();
    if(next.done){
      setQuoteIter(quoteArray[Symbol.iterator]());
    }
    setQuote(next.value);
  }
  return (
    <div className="App" id="quote-box">
      <p id="text">{quote.quote}</p>
      <p id="author">{quote.author}</p>
      <div id="call-action">
        <button id="new-quote" onClick={nextQuote}>New quote</button>
        <a id="tweet-quote" href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote.quote}`} title="Tweet this quote!"> <i className="fa fa-twitter"></i></a>
      </div>
    </div>
  );
}

export default App;
