import PropTypes from 'prop-types';
import React from 'react';

import Shelf from '../Shelf';
import { getBooksByShelfTemplate, getShelvesWithTitles } from '../../utils';

const propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      shelf: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onShelfChanged: PropTypes.func.isRequired,
};

function BookCase(props) {
  const { books } = props;
  const booksByShelf = getBooksByShelfTemplate();

  books.forEach((book) => {
    booksByShelf[book.shelf].push(book);
  });

  return (
    <div>
      {getShelvesWithTitles().map(([shelf, title]) => (
        <Shelf
          key={shelf}
          books={booksByShelf[shelf]}
          name={title}
          onShelfChanged={props.onShelfChanged}
        />
      ))}
    </div>
  );
}

BookCase.propTypes = propTypes;

export default BookCase;
