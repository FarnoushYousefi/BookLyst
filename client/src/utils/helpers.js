import { searchGoogleBooks, searchCurrentBook, searchRealatedBooks } from "./API";

// Search handle function
export const searchHandle = async (query) => {
  if(!query) {
    alert('please enter a query!');
  }
  // get results form google api
  try {
    const gResponse = await(searchGoogleBooks(query));

    if(!gResponse.ok) {
      throw new Error('Something went wrong!');
    }
    const gBookData = await gResponse.json();

    const gBooks = gBookData.items.map(book => ({
      bookId: book.id,
      authors: book.volumeInfo.authors || ['No author to display'],
      title: book.volumeInfo.title,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks?.thumbnail || '',
      isbn13: book.volumeInfo.industryIdentifiers?.[0].identifier || ''
      }
    ));

    return gBooks;
  } catch (e) {
    console.error(e);
  }
}; 

// Search handle function
export const deepSearchHandle = async (query, type) => {
  if(!query) {
    alert('please enter a query!');
  }
  // get results form google api
  try {
    if(type === 'related') {
      // const gResponse = await searchRealatedBooks
    }
    const gResponse = await(searchGoogleBooks(query));

    if(!gResponse.ok) {
      throw new Error('Something went wrong!');
    }

    const gBookData = await gResponse.json();

    const gBooks = gBookData.items.map((book) => {
      let isbn13 = '';
      let isbn10 = '';
      if(book.volumeInfo.industryIdentifiers) {
        if(book.volumeInfo.industryIdentifiers[0]) {
          isbn13 = book.volumeInfo.industryIdentifiers[0].identifier;
        }

        if(book.volumeInfo.industryIdentifiers[1]) {
          isbn10 = book.volumeInfo.industryIdentifiers[1].identifier;
        }
      }

      return {
        bookId: book.id,
        authors: book.volumeInfo.authors || [],
        title: book.volumeInfo.title || 'No Title Available',
        description: book.volumeInfo.description || '',
        categories: book.volumeInfo?.categories || [],
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        isbn13: isbn13,
        isbn10: isbn10,
        webReaderLink: book.accessInfo?.webReaderLink || '',
        googleListPrice: book.saleInfo.listPrice?.amount.toString() || '',
        googleRetailPrice: book.saleInfo.retailPrice?.amount.toString() || '',
        googlePlayBooks: book.volumeInfo?.infoLink || '',
        googleRatings: book.volumeInfo?.ratingsCount || '',
        publishedDate: book.volumeInfo.publishedDate || '',
        publisher: book.volumeInfo.publisher || ''
        }
    });

    return gBooks;
  } catch (e) {
    console.error(e);
  }
}; 

// fetch retatedBook Details
export const fetchRelatedBooks = async (category, authors) => {
  if(!authors && !category) {
    console.error('No data to find match');
  }
  // get results form google api
  try {
    const gResponse = await(searchCurrentBook(category, authors));

    if(!gResponse.ok) {
      throw new Error('Something went wrong!');
    }

    const gBookData = await gResponse.json();

    console.log('dbjbds', gBookData);

    return gBookData;
  } catch (e) {
    console.error(e);
  }
}; 

// fetch currectBook Details
export const fetchCurrentBook = async (bookId) => {
  if(!bookId) {
    alert('book ID is invalid');
  }
  // get results form google api
  try {
    const gResponse = await(searchCurrentBook(bookId));

    if(!gResponse.ok) {
      throw new Error('Something went wrong!');
    }

    const gBookData = await gResponse.json();

    return gBookData;
  } catch (e) {
    console.error(e);
  }
}

// filter the current book
export const filterSavingBook = (searchedBooks, bookId) => {

  const saveBookDetails = searchedBooks.find(book => book.bookId === bookId);

  const bookToSave = {
    bookId: saveBookDetails.bookId,
    authors: saveBookDetails.authors,
    title: saveBookDetails.title,
    description: saveBookDetails.description,
    categories: saveBookDetails.categories,
    image: saveBookDetails.image,
    isbn13: saveBookDetails.isbn13,
    isbn10: saveBookDetails.isbn10,
    webReaderLink: saveBookDetails.webReaderLink,
    googleListPrice: saveBookDetails.googleListPrice,
    googleRetailPrice: saveBookDetails.googleListPrice,
    googlePlayBooks: saveBookDetails.googlePlayBooks,
    googleRatings: saveBookDetails.googleRatings,
    publishedDate: saveBookDetails.publishedDate,
    publisher: saveBookDetails.publisher
  }

  return bookToSave;
}

// function for mobile toggle 
export const mobileMenuToggle = () => {
  const navContainer = document.querySelector('.navbar');
  const navIcon = document.querySelector('#mobile-nav-icon');

  if(navContainer.className.includes('nav-hide')) {
    navContainer.classList.add('nav-show');
    navIcon.classList.add('nav-open');
    navContainer.classList.remove('nav-hide');
  } else {
    navIcon.classList.remove('nav-open');
    navContainer.classList.remove('nav-show');
    navContainer.classList.add('nav-hide');
  }
}
