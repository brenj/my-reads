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
import { getIdToShelfMap } from './utils';

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
  state = { books: [], welcomeVisible: true };

  componentDidMount() {
    booksAPI.getAll().then((books) => {
      this.idToShelfMap = getIdToShelfMap(books);
      this.setState({ books });
    });
  }

  onShelfChanged = (bookToUpdate, toShelf) => {
    booksAPI.update(bookToUpdate, toShelf).then(() => {
      this.setState((prevState) => {
        const fromShelf = bookToUpdate.shelf;
        let updatedBooks = null;

        if (toShelf === 'none') {
          // Remove book from shelf
          updatedBooks = prevState.books.filter(book => (
            book.id !== bookToUpdate.id
          ));
        } else if (fromShelf === 'none') {
          // Add book to shelf
          const updatedBook = { ...bookToUpdate, shelf: toShelf };
          updatedBooks = [...prevState.books, updatedBook];
        } else {
          // Move book from one shelf to another
          updatedBooks = prevState.books.map((book) => {
            const updatedBook = book;
            if (book.id === bookToUpdate.id) {
              updatedBook.shelf = toShelf;
            }
            return updatedBook;
          });
        }

        return { ...prevState, books: updatedBooks };
      });
      // Update id to shelf mapping
      this.idToShelfMap[bookToUpdate.id] = toShelf;
    });
  }

  handleDismissWelcome = () => {
    this.setState({ welcomeVisible: false });
  }

  idToShelfMap = {};

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
                  <BookSearch
                    idToShelfMap={this.idToShelfMap}
                    onShelfChanged={this.onShelfChanged}
                  />
                </Container>
              </div>
            )}
          />
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
