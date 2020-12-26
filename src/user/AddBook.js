import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import {isAuthenticated} from '../auth'
import { addBook } from '../user/ApiUser';
import Menu from '../core/Menu'
import Layout from '../core/Layout';


const AddBook=()=>{

    const [isbn,setIsbn]=useState(""); 
    const [redirect,setRedirect]=useState(false);   
    const {user,token}=isAuthenticated();

    const isbnHandler=(event)=>{
        setIsbn(event.target.value);
    }

    const addButton=(e)=>{
        e.preventDefault();
        addBook(user._id,isbn,token).then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                console.log(data);
                setRedirect(true);                
            }
        })
    }

    const shouldRedirect=redirect=>{
        if(redirect){
            return <Redirect to="/" />
        }
    }
    return(
        <React.Fragment>
            <Menu />
            <Layout title="Add new book" description="Enter the isbn number" className="container">    
            <form >
        {shouldRedirect(redirect)}
          <div class="form-group"> 
            <label for="isbn">ISBN</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              className="form-control"
              placeholder="Enter ISBN"
              value={isbn}
              onChange={isbnHandler}
            />
          </div>
          <button onClick={addButton} className="btn btn-primary btn-block">Add Book</button>
        </form>
            </Layout>
        </React.Fragment>
    
    );
}

export default AddBook;
