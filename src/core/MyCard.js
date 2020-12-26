import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { getBookDetails, getDetails } from './ApiCore'
import { Redirect } from 'react-router-dom';
import {isAuthenticated} from '../auth'
import { listBook,unlistBook,deleteBook,borrowBook } from '../user/ApiUser';


const MyCard = (props) => {

    let isbn={"product":props.product};
    
    let viewProduct=props.viewProduct,listButton=props.listButton,setRun=props.runSetter,run=props.run;
    let unlistButton=props.unlistButton;
    let showDeleteButton=props.showDeleteButton;
    let owner=props.owner;
    let showBorrowButton=props.showBorrowButton;

    const [info, setInfo] = useState({});
    const [author, setAuthor] = useState("");
    const [imgLink, setImgLink] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const {user,token}=isAuthenticated();


    //to list a book
    const enlistBook=()=>{
        //console.log(isbn.product);        
        //console.log("outside");
        listBook(user._id,isbn.product,token).then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                setRun(!run);
                console.log("inside");
            }
        })
    }

    const ListButton=(listButton)=>{
        if(listButton){
            return(
                <button onClick={enlistBook} className="btn btn-outline-danger mt-2 ml-2 mb-2">
                    List Book
                </button>            
            )
        }
    }



    //to borrow a book
    const borrowBookOnClickHandler=()=>{
        //console.log(isbn.product);        
        //console.log("outside");
        borrowBook(user._id,isbn.product,owner,token).then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                setRun(!run);
                console.log("inside");
            }
        })
    }

    const BorrowButton=(showBorrowButton)=>{
        if(showBorrowButton){
            return(
                <button onClick={borrowBookOnClickHandler} className="btn btn-outline-danger mt-2 ml-2 mb-2">
                    Borrow Book
                </button>            
            )
        }
    }



    //to delete a book
    const deleteBookOnClick=()=>{        
        deleteBook(user._id,isbn.product,token).then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                setRun(!run);
                console.log("inside");
            }
        })
    }

    const DeleteButton=(showDeleteButton)=>{
        if(showDeleteButton){
            return(
                <button onClick={deleteBookOnClick} className="btn btn-outline-danger mt-2 ml-2 mb-2">
                    Delete Book
                </button>            
            )
        }
    }
    


    //to unlist a book
    const unlistBookHelper=()=>{
        //console.log(isbn.product);
        //setRun(!run);
        console.log("outside");
        unlistBook(user._id,isbn.product,token).then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                setRun(!run);
                console.log("inside");
            }
        })
    }

    const UnListButton=(unlistButton)=>{
        if(unlistButton){
            return(
                <button onClick={unlistBookHelper} className="btn btn-outline-danger mt-2 ml-2 mb-2">
                    Unlist Book
                </button>            
            )
        }
    }


    //init function
    const init = (isbn) => {
        getBookDetails(isbn).then(data => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                setInfo(data);
                console.log("data",isbn,data);
                let item_s = data.items;
                //console.log("items",item_s);
                // Volume info
                let item = item_s[0].volumeInfo;

                // Author
                let author=item.authors;
                if (typeof author === 'undefined') {
                    setAuthor('No author');
                }
                else{
                    setAuthor(item.authors[0]);
                }

                // Image link
                /*src={
                    book.volumeInfo.imageLinks === undefined
                      ? ""
                      : `${book.volumeInfo.imageLinks.thumbnail}`
                }*/
                if(item.imageLinks=== undefined){
                    setImgLink("https://in.pinterest.com/pin/478577897904782388/");                
                }
                else{
                    setImgLink(item.imageLinks.thumbnail);                
                }
                
                //setImgLink(item.imageLinks.thumbnail);

                // Title
                setTitle(item.title);

                // Description
                let desc=item.description;
                

                if (typeof desc === 'undefined') {
                    setDesc('No description available');
                }
                else{
                    if(desc.length>20){
                        desc=desc.substring(0,50)+"..."
                        setDesc(desc);
                    }                    
                }

                //console.log(isbn, data);
            }
        })
    }

    useEffect(() => {
        //console.log("props",props);
        init(isbn);
    }, [run]);


    const BootCard = () => {
            return (
                <div className="card mb-3" style={{ MaxWidth: "540px" }}>
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={`${imgLink}`} className="card-img" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{author}</p>
                                <p className="card-text"><small className="text-muted">{desc}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }

    const showViewProduct=(viewProduct)=>{
        if(viewProduct){
            return <button className="btn btn-outline-warning mt-2 ml-2 mb-2">
                View Book
            </button> 
        }
        
    }



    const showCardDetails = () => {
        let image, name, pDate, authors;
        if (info['items'] != 'undefined') {
            image = info['items'][0]['volumeInfo']['imageLinks']['thumbnail'];
            name = info['items'][0]['volumeInfo']['title'];
            pDate = info['items'][0]['volumeInfo']['publishedDate'];
            authors = info['items'][0]['volumeInfo']['authors'][0];
        }

        if (image && name)
            return (
                <div className="col-md-8 m-auto">
                    <div className="card card-body">
                        <table align='center' width='600'>
                            <td width='170' align='left'>
                                <img src={image} />

                            </td>
                            <td width='170'>
                                Name: ${name} <br />
                            Published Date:   <br />
                            Authors:  <br />
                            ISBN: <br />
                            </td>
                            <td width='260'>

                            </td>
                        </table>
                        <div align='right'>
                            <a href="" className='btn btn-danger' style={{ display: 'inline-block !important' }}>
                                <i className="w3-large fa fa-trash"></i>Delete
                        </a>
                        </div>

                    </div>
                </div>
            )
    }

    const BootCard2=()=>{
        return(
        <div className=" card tile is-child is-3 box">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={`${imgLink}`} alt="Placeholder image" />
            </figure>
          </div>
          <div className="card-content">
            <p className="title is-6 has-text-primary has-text-centered is-capitalized">{title}</p>
            <p className="title is-6 has-text-primary has-text-centered is-capitalized">{author}</p>
            <p className="has-text-black-ter has-text-weight-normal">{desc}</p>
          </div>
          <span>
          {showViewProduct(viewProduct)}
          {ListButton(listButton)}
          {UnListButton(unlistButton)}
          {DeleteButton(showDeleteButton)}
          {BorrowButton(showBorrowButton)}
          </span>
          
        </div>)
    }

    return (
        <div>
            {BootCard2()}
        </div>
    )
}

export default MyCard;