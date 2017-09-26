import PropTypes from 'prop-types';
import React from 'react';

import BookShelf from '../BookShelf';
import { getBooksByShelfTemplate, getShelvesWithHeadings } from '../../utils';

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
      {getShelvesWithHeadings().map(([shelf, title]) => (
        <BookShelf
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
