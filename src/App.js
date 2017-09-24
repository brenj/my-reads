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
      this.setState({ books });
    });
  }

  onShelfChanged = (bookToUpdate, toShelf) => {
    this.setState((prevState) => {
      const updatedBooks = prevState.books.map((book) => {
        if (book.id === bookToUpdate.id) {
          book.shelf = toShelf;
        }
        return book;
      });
      return { ...prevState, books: updatedBooks };
    });

    booksAPI.update(bookToUpdate, toShelf);
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
                  <BookSearch
                    books={books}
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
