const REQUIRED_AMOUNT_OF_SYMBOLS = 140;

export const createFilmCardTemplate = (task) => {
  const { filmName, filmPoster, description, comments, rate, dateOfRelease, time, genre } = task;

  const limitDescription = (desc) => {
    let sliced = desc.slice(0, REQUIRED_AMOUNT_OF_SYMBOLS);

    if (sliced.length < desc.length) {
      sliced += '...';
    }

    return sliced;
  };

  return `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${filmName}</h3>
    <p class="film-card__rating">${rate}</p>
    <p class="film-card__info">
      <span class="film-card__year">${dateOfRelease}</span>
      <span class="film-card__duration">${time}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="./images/posters/${filmPoster}" alt="" class="film-card__poster">
    <p class="film-card__description">${limitDescription(description)}</p>
    <span class="film-card__comments">${comments} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>`;
};


