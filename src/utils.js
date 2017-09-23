const SHELVES = {
  currentlyReading: {
    title: 'Books you\'re currently reading',
    order: 1,
  },
  wantToRead: {
    title: 'Books you want to read',
    order: 2,
  },
  read: {
    title: 'Books you\'ve finished reading',
    order: 3,
  },
};

export const getBooksByShelfTemplate = () => {
  const booksByShelf = {};
  Object.keys(SHELVES).forEach(shelf => (booksByShelf[shelf] = []));

  return booksByShelf;
};

export const getShelvesWithTitles = () => {
  const shelvesWithTitles = [];
  const orderedShelves = Object.keys(SHELVES).sort((s1, s2) => (
    SHELVES[s1].order - SHELVES[s2].order
  ));

  orderedShelves.forEach((shelf) => {
    shelvesWithTitles.push([shelf, SHELVES[shelf].title]);
  });

  return shelvesWithTitles;
};
