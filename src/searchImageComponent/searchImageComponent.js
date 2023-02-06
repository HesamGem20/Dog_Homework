import '../css/searchImageComponent.css';
import ContentComponent from '../contentComponent/contentComponent';

class SearchImage extends ContentComponent {
  constructor() {
    super();
    this.render();
  }

  /**
   *
   * @param {string} The search the user entered
   * @returns {Promise<string[]>}
   */
  async getImages(searchTerm) {
    searchTerm = searchTerm.split(' ');
    // searchTerm is now an array
    let urlString = '';
    if (searchTerm.length === 1) {
      urlString = `https://dog.ceo/api/breed/${searchTerm[0]}/images`;
    }
    if (searchTerm.length === 2) {
      urlString = `https://dog.ceo/api/breed/${searchTerm[1]}/${searchTerm[0]}/images`;
    }
    const response = await fetch(urlString);
    if (!response.ok) {
      return new Error('API response error');
    }
    const data = await response.json();
    if (data.message.length === 0) {
      return;
    }
    console.log(data);
    return data.message;
  }

  /**
   *
   * @param {array} imageList
   * @returns {void}
   */
  displayImage(imageList) {
    const img = document.createElement('img');
    img.src = imageList[Math.floor(Math.random() * imageList.length)];
    this.clearContent();
    document.querySelector('#content').appendChild(img);
  }

  render() {
    const markup = `
    <form class="dog-search">
      <span class="search-icon"></span>
      <input type="text" id="dogSearchInput">
      <button>Search</button>
    </form>
    `;

    document.querySelector('#header').insertAdjacentHTML('beforeend', markup);
    document.querySelector('.dog-search button').addEventListener('click', (e) => {
      e.preventDefault();
      const searchTerm = document.querySelector('#dogSearchInput').value;
      if (!searchTerm) {
        this.displayError('Please enter a breed to search');
        return;
      }
      console.log(searchTerm);
      this.getImages(searchTerm)
        .then((imageList) => {
          if (imageList) {
            this.clearErrors();
            this.displayImage(imageList);
          } else {
            // error handling for 404 reposnse
            this.displayError('Breed not found, Try to list the breeds first');
          }
        })
        .catch((error) => {
          this.displayError('Something went wrong :(');
          console.error(error);
        });
    });
  }
}

export default SearchImage;
