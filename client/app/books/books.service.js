'use strict';

angular.module('bookApp')
  .factory('books', function($http, auth) {
      var books = {
        allBooks: [],
      };

      books.getMyBooks = function(){
        books.allBooks = [];
        return $http.get('/api/books/mybooks', {
          headers: {'Authorization': 'Bearer '+auth.getToken()}
        }).success(function(data){
          books.allBooks = data;
        })
      }

      books.getAllBooks = function(){
        books.allBooks = [];
        return $http.get('api/books/',{
          headers: {'Authorization': 'Bearer '+auth.getToken()}
        }).success(function(data){
          books.allBooks = data;
        })
      }

      books.addBook = function(book){
        return $http.get('https://www.googleapis.com/books/v1/volumes?q='+book.name).success(function(data){
          book.img = data.items[0].volumeInfo.imageLinks.thumbnail;
          console.log(book.img)
          $http.post('/api/books/addbook',book, {
          headers: {'Authorization': 'Bearer '+auth.getToken()}
          }).success(function(data){
            books.getMyBooks();
          })///////////////////////////////////////////////////problem///////////////////////////////////////////
        })
        
      }

      books.getBookCover = function(name){
        return $http.get('https://www.googleapis.com/books/v1/volumes?q='+name).success(function(data){
          books.newCover = data.items[0].volumeInfo.imageLinks.thumbnail;
        })
      }

      books.deleteBook = function(id){
        return $http.delete('api/books/'+id, {
          headers: {'Authorization': 'Bearer '+auth.getToken()}
        }).success(function(data){
          books.getMyBooks();
        })
      }

      books.tradeBook = function(id){
        return $http.put('api/books/trade/'+id, null, {
          headers: {'Authorization': 'Bearer '+auth.getToken()}
        }).success(function(data){
          books.getAllBooks();
        })
      }

      books.acceptBook = function(id,trade){
        return $http.put('api/books/trade/'+id, trade, {
          headers: {'Authorization': 'Bearer '+auth.getToken()}
        }).success(function(data){
          books.getMyBooks();
        })
      }

      return books;
  });
