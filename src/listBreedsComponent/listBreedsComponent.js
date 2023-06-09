import '../css/listBreedsComponent.css';
import ContentComponent from '../contentComponent/contentComponent';

class ListBreeds extends ContentComponent {
  constructor() {
    super();
    this.breeds = null; // Initialize the `breeds` property to null
    this.render();
  }

  async getFullList() {
    if (this.breeds !== null) { // Check if the `breeds` property has already been set
      console.log('Loading breeds from cache...'); // Log a message indicating that we're loading from cache
      return this.breeds; // Return the cached `breeds`
    }
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if (!response.ok) {
      return new Error('API response error');
    }
    const data = await response.json();
    this.breeds = data.message; // Store the fetched `breeds` in the `breeds` property
    localStorage.setItem('dogs', JSON.stringify(this.breeds)); // Store the `breeds` in localStorage
    console.log('Fetching and caching breeds...');
    return this.breeds;
  }

  /**
   *
   * @param {string} breedName
   */
  createListItem(breedName) {
    const item = document.createElement('div');
    item.classList.add('breed-list-item');
    item.innerHTML = breedName;
    document.querySelector('#content').appendChild(item);
  }

  /**
   *
   * @param {object} breedList
   */
  displayList(breedList) {
    for (const breed in breedList) {
      // check if the breeed has sub-breeds
      if (breedList[breed].length !== 0) {
        for (const subBreed of breedList[breed]) {
          this.createListItem(subBreed + ' ' + breed);
        }
      } else {
        this.createListItem(breed);
      }
    }
  }

  clearContent() {
    const content = document.querySelector('#content');
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
  }

  displayError(errorMessage) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.innerText = errorMessage;
    document.querySelector('#content').appendChild(errorElement);
  }

  render() {
    const button = document.createElement('button');
    button.classList.add('list-button');
    button.innerHTML = 'List Breeds';

    document.querySelector('#header').appendChild(button);
    button.addEventListener('click', () => {
      this.getFullList()
        .then((breedList) => {
          this.clearContent();
          // short circuit evaluation
          breedList && this.displayList(breedList);
        })
        .catch((error) => {
          this.displayError('Error listing the breeds, please try again later.');
          console.error(error);
        });
    });
  }
}

export default ListBreeds;
