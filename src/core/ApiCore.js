const rp = require('request-promise');
export const getBookDetails = (product) => {
    console.log("now",product)
    let id=product.product;
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',            
        }        
    })
        .then(response => {
             return response.json();          
        })
        .catch(err => {
            console.log(err);
        });
};
   
export const getDetails = (isbn) => {
    return getBookDetails(isbn)
        .then(response => {
            return response;
        })
        .catch(err => {
            console.log(err);
        });
};
   
export const getBookDetails2 = (isbn) => {
    var apiURL = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;
	return rp({
		url : apiURL,
		method : 'GET',
		json : true
	});
};

export const getTransferMarketListedBooks = (userId,token) => {    
    return fetch(`http://localhost:8001/api/getTransferMarketListedBooks/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};