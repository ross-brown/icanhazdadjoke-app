"use strict";

/** displayJokes: render each joke on the DOM with voting buttons and a score.*/

function displayJokes(jokes) {
  for (const joke of jokes) {
    const $joke = $("<p>", { text: joke, class: "joke" })
      .append($("<button>", { text: "vote-up", class: 'vote-up' }),
        $("<button>", { text: "vote-down", class: 'vote-down' }), $("<span>", { text: 0, class: 'score' }));

    $(".jokes").append($joke);
  }
}

/** handleVote: increment or decrement the score for a joke based on which button was clicked. */

function handleVote(evt) {
  const $scoreSpan = $(evt.target).siblings('.score');
  const currScore = Number($scoreSpan.text());

  if ($(evt.target).hasClass("vote-up")) {
    $scoreSpan.text(currScore + 1);
  } else if ($(evt.target).hasClass("vote-down")) {
    $scoreSpan.text(currScore - 1);
  }
}

/** fetchJokes: send HTTP request to dad jokes API and return 10 jokes.
 * Returns an array of dad jokes
 */

async function fetchJokes() {
  const params = new URLSearchParams({ limit: 10 });

  const response = await fetch(`https://icanhazdadjoke.com/search?${params}`, {
    headers: { Accept: 'application/json' }
  });

  const data = await response.json();
  return data.results.map(jokeObj => jokeObj.joke);
}


/** main: calls the fetch function and then the displayJokes function */

async function main() {
  const dadJokes = await fetchJokes();
  displayJokes(dadJokes);
}

main();


$(".jokes").on("click", handleVote);
