import PropTypes from 'prop-types';
import React from 'react';
import { Card, Form, Image } from 'semantic-ui-react';

import './book.css';
import BookDetails from '../BookDetails';
import { getShelfOptions } from '../../utils';

const NO_COVER_IMAGE = (
  'http://via.placeholder.com/220x220?text=No%20Cover%20Image'
);

const propTypes = {
  book: PropTypes.shape({
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string.isRequired,
    }).isRequired,
    shelf: PropTypes.string.isRequired,
  }).isRequired,
  onShelfChanged: PropTypes.func.isRequired,
};

class Book extends React.Component {
  state = { shelf: 'none' };

  componentWillMount() {
    this.setState({ shelf: this.props.book.shelf });
  }

  handleChange = (event, data) => {
    const toShelf = data.value;

    this.setState({ shelf: toShelf });
    this.props.onShelfChanged(this.props.book, toShelf);
  };

  render() {
    const { book } = this.props;
    const thumbnail = book.imageLinks.thumbnail || NO_COVER_IMAGE;

    return (
      <div className="book">
        <Card fluid>
          <Image
            centered
            shape="rounded"
            src={thumbnail}
            width="220"
            height="220"
          />
          <Card.Content extra textAlign="center">
            <Form>
              <Form.Select
                header="-- Choose a Shelf --"
                value={this.state.shelf}
                onChange={this.handleChange}
                options={getShelfOptions()}
                compact
              />
            </Form>
            <BookDetails book={book} thumbnail={thumbnail} />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

Book.propTypes = propTypes;

export default Book;
