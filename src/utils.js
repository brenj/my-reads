const SHELVES = {
  currentlyReading: {
    name: 'Currently Reading',
    heading: 'Books you\'re currently reading',
    order: 1,
  },
  wantToRead: {
    name: 'Want to Read',
    heading: 'Books you want to read',
    order: 2,
  },
  read: {
    name: 'Finished Reading',
    heading: 'Books you\'ve finished reading',
    order: 3,
  },
};

export const getBooksByShelfTemplate = () => {
  const booksByShelf = {};

  Object.keys(SHELVES).forEach((shelf) => {
    booksByShelf[shelf] = [];
  });

  return booksByShelf;
};

export const getOrderedShelves = () => (
  Object.keys(SHELVES).sort((s1, s2) => (
    SHELVES[s1].order - SHELVES[s2].order
  )));

export const getShelvesWithHeadings = () => {
  const shelvesWithHeadings = [];

  getOrderedShelves().forEach((shelf) => {
    shelvesWithHeadings.push([shelf, SHELVES[shelf].heading]);
  });

  return shelvesWithHeadings;
};

export const getShelfOptions = () => {
  const shelfOptions = [];

  getOrderedShelves().forEach((shelf) => {
    shelfOptions.push({
      key: shelf,
      text: SHELVES[shelf].name,
      value: shelf,
    });
  });

  shelfOptions.push({ key: 'none', value: 'none', text: 'No Shelf' });

  return shelfOptions;
};

export const getIdToShelfMap = (books) => {
  const idToShelfMap = new Map();

  books.forEach((book) => {
    idToShelfMap.set(book.id, book.shelf);
  });

  return idToShelfMap;
};
