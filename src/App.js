import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';

import './App.css';
import * as booksAPI from './api/books-api';
import BookCase from './component/BookCase';
import BookSearch from './component/BookSearch';
import Footer from './component/Footer';
import NavBar from './component/NavBar';
import WelcomeMessage from './component/WelcomeMessage';
import { getBooksByShelfTemplate } from './utils';

const PageNotFound = () => (
  <div>
    <NavBar activeMenuItem="none" />
    <Container textAlign="center" className="not-found-message">
      <Header content="404" size="huge" />
      <Header size="large">Page Not Found</Header>
    </Container>
    <Footer />
  </div>
);

class App extends React.Component {
  state = {
    books: getBooksByShelfTemplate(),
    welcomeVisible: true,
  };

  componentDidMount() {
    booksAPI.getAll().then((booksData) => {
      const books = getBooksByShelfTemplate();

      booksData.forEach((bookData) => {
        books[bookData.shelf].push(bookData);
      });
      this.setState({ books });
    });
  }

  onShelfChanged = (book, toShelf) => {
    const fromShelf = book.shelf;
    const specifiedBook = { ...book, shelf: toShelf };

    this.setState((prevState) => {
      const newState = { ...prevState };

      // Add specified book to new, valid shelf
      if (toShelf !== 'none') {
        newState.books[toShelf] = [
          ...newState.books[toShelf], specifiedBook];
      }

      // Remove specified book from old, valid shelf
      if (fromShelf !== 'none') {
        newState.books[fromShelf] = newState.books[fromShelf].filter(
          bookOnFromShelf => bookOnFromShelf.id !== specifiedBook.id);
      }
    });

    booksAPI.update(specifiedBook, toShelf);
  }

  handleDismissWelcome = () => {
    this.setState({ welcomeVisible: false });
  }

  render() {
    const { books, welcomeVisible } = this.state;

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <NavBar activeMenuItem="home" />
                <Container>
                  {welcomeVisible &&
                    <WelcomeMessage
                      color="blue"
                      handleDismissWelcome={this.handleDismissWelcome}
                      size="large"
                    />
                  }
                  <BookCase
                    books={books}
                    onShelfChanged={this.onShelfChanged}
                  />
                </Container>
              </div>
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <div>
                <NavBar activeMenuItem="search" />
                <Container>
                  <BookSearch onShelfChanged={this.onShelfChanged} />
                </Container>
              </div>
            )}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
