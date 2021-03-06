import AbstractView from './abstract-view.js';

const getFilmGenreElements = (genres) => genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

const getFilmCommentElements = (comments) => (
  comments.map((comment) => `<li class="film-details__comment">
<span class="film-details__comment-emoji">
  <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-${comment.emoji}">
</span>
  <div>
    <p class="film-details__comment-text">${comment.message}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comment.author}</span>
      <span class="film-details__comment-day">${comment.date}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`).join('')
);

const createFilmInfoTemplate = (film) => {
  const { filmName, filmPoster, filmDescription, filmRate, filmReleaseDateFull, filmTime, filmGenresFull, filmDirector, filmWriters, filmActors, filmCountry, filmAgeRating, filmComments, isWatchlist, isWatched, isFavorite } = film;

  const correctGenres = filmGenresFull.length > 1
    ? 'Genres'
    : 'Genre';

  const watchListClassName = isWatchlist
    ? 'film-details__control-button--active'
    : '';

  const watchedClassName = isWatched
    ? 'film-details__control-button--active'
    : '';

  const favoriteClassName = isFavorite
    ? 'film-details__control-button--active'
    : '';

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${filmPoster}" alt="">

            <p class="film-details__age">${filmAgeRating}+</p>
        </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmName}</h3>
                <p class="film-details__title-original">Original: ${filmName}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmRate}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmDirector}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${filmWriters}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${filmActors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${filmReleaseDateFull}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${filmTime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${correctGenres}</td>
                <td class="film-details__cell">${getFilmGenreElements(filmGenresFull)}</td>
              </tr>
            </table>
            <p class="film-details__film-description">
              ${filmDescription}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button ${watchListClassName} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${watchedClassName} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${favoriteClassName} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmComments.length}</span></h3>

          <ul class="film-details__comments-list">${getFilmCommentElements(filmComments)}</ul>

                  <div class="film-details__new-comment">
                    <div class="film-details__add-emoji-label"></div>

                    <label class="film-details__comment-label">
                      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                    </label>

                    <div class="film-details__emoji-list">
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                        <label class="film-details__emoji-label" for="emoji-smile">
                          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

                          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                            <label class="film-details__emoji-label" for="emoji-sleeping">
                              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

                              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                                <label class="film-details__emoji-label" for="emoji-puke">
                                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

                                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                                    <label class="film-details__emoji-label" for="emoji-angry">
                                      <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmInfoView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmInfoTemplate(this.#film);
  }

  setInfoClickHandler = (callback) => {
    this._callback.infoClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#infoClickHandler);
  }

  #infoClickHandler = () => {
    this._callback.infoClick();
  }
}
