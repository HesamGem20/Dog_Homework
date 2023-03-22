import '../css/listBreedsComponent.css';
import ContentComponent from '../contentComponent/contentComponent';

class ListBreeds extends ContentComponent {
  constructor() {
    super();
    this.render();
  }

  async getFullList() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    if (!response.ok) {
      return new Error('API response error');
    }
    const data = await response.json();
    return data.message;
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
