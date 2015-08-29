'use strict';

angular.module('bookApp')
  .controller('MybooksCtrl', function ($scope, books, auth) {
    $scope.books = books;
    $scope.state = true;
    $scope.user = auth;
    $scope.editUserData = {

        user: {
            username: $scope.user.user.username,
            fullname: $scope.user.user.fullname,
            location: $scope.user.user.location,
        },
        state: true
    }


    $scope.getMyBooks = function(){
    	books.getMyBooks();
        $scope.state = true;
    }

    $scope.getAllBooks = function(){
        books.getAllBooks();
        $scope.state = false;
    }

    $scope.getUser = function(){
        auth.getUser();
    }

    $scope.addBook = function(){
    	books.addBook($scope.newBook);
    	$scope.newBook.title = "";
    }

    $scope.deleteBook = function(id){
        books.deleteBook(id);
    }

    $scope.tradeBook = function(id){
        books.tradeBook(id);
    }

    $scope.acceptBook = function(id,trade){
        books.acceptBook(id,trade)
    }

    $scope.editUser = function(){
        auth.editUser($scope.editUserData.user);
    }
    
    $scope.getMyBooks();
    if($scope.user.fullname == undefined){
        $scope.getUser();
    }


  });
