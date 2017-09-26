[![Live Demo](https://img.shields.io/badge/live%20demo-active-brightgreen.svg?style=flat-square)](https://brenj.github.io/my-reads/)

MyReads: A Book Lending App
===========================

About
-----
From Udacity:
> Create a React application from scratch and utilize React components to
> manage the user interface. You’ll create a virtual bookcase to store your
> books and track what you're reading. Using the provided Books API, you’ll
> search for books and add them to a bookshelf as a React component. Use
> React's setState to build the functionality to move books from one shelf to
> another.

Supporting courses:
* React Fundamentals

MyReads was created using `create-react-app`, and the only starter code provided
was the interface to Udacity's books API. I chose to modify this interface
slightly to fix some inconsistencies in the data.

Requirements
------------
* Node
* Node Package Manager (npm)

Install
-------
1. `npm install`
2. `npm start`

Code Quality
------------
This code base adheres to the [Airbnb JavaScript/React/JSX Style Guide](https://github.com/airbnb/javascript)  
Use `npm run lint` to check syntax and style.

Code Organization (src)
-----------------------

``` console
├── App.css             
├── App.js              
├── api                 
│   └── books-api.js    
├── component           
│   ├── Book            
│   │   ├── book.css    
│   │   └── index.js    
│   ├── BookCase        
│   │   └── index.js    
│   ├── BookDetails     
│   │   └── index.js    
│   ├── BookList        
│   │   ├── book-list.css                       
│   │   └── index.js    
│   ├── BookSearch      
│   │   ├── book-search.css                     
│   │   └── index.js    
│   ├── Footer          
│   │   ├── footer.css  
│   │   └── index.js    
│   ├── NavBar          
│   │   └── index.js    
│   ├── Shelf           
│   │   ├── index.js    
│   │   └── shelf.css   
│   └── WelcomeMessage  
│       ├── index.js    
│       └── welcome-message.css                 
├── index.css           
├── index.js            
├── registerServiceWorker.js                    
└── utils.js
```

Grading (by Udacity)
--------------------

Criteria           |Highest Grade Possible  |Grade Recieved
-------------------|------------------------|--------------
Application Setup  |Meets Specifications    |Meets Specifications
Main Page          |Meets Specifications    |Meets Specifications
Search Page        |Meets Specifications    |Meets Specifications
Routing            |Meets Specifications    |Meets Specifications
Code Functionality |Meets Specifications    |Meets Specifications

> The Book Lending App is working great. Your project looks amazing, one of the best I've seen so far.  
> \- Reviewer
