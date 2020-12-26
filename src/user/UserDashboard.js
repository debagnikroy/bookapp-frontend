import React, { useEffect,useState } from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth'
import { Link } from 'react-router-dom';
import {getPurchaseHistory,getCurrentBooks, getListedBooks} from './ApiUser';
import Menu from '../core/Menu';
import MyCard from '../core/MyCard';

const Dashboard=()=>{

    const [currentBookList,setCurrentBooks]=useState([]);
    const [listedBooks,setListedBooks]=useState([]);
    const {user: {_id,name,email,role}}=isAuthenticated();  
    const [run,setRun]=useState(false);
    const token=isAuthenticated().token;   

    const init=(userId,token)=>{
        /*setCurrentBooks([]);
        setListedBooks([]);*/
        getCurrentBooks(userId,token).then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                console.log("latest",data[0].currentBooks);
                setCurrentBooks(data[0].currentBooks);
            }
        })
        .catch(err=>{
            console.log(err);
        })

        getListedBooks(userId,token).then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                console.log("latest listedBooks",data[0].listedBooks);
                setListedBooks(data[0].listedBooks);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        init(_id,token);
        console.log("curr",currentBookList);
    },[run]);

    /*const [history,setHistory]=useState([]);
    const {user: {_id,name,email,role}}=isAuthenticated(); 
    const token=isAuthenticated().token;
    const init=(userId,token)=>{
        getPurchaseHistory(userId,token).then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                setHistory(data);
            }
        })
    }

    useEffect(()=>{
        init(_id,token);
    },[])

    const profileUpdate=()=>{
        return(
            <div className="card">
                <h3 className="card-header">User Links</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const userInformation=()=>{
        return(
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role===1 ? 'admin' : 'registered user'}</li>
                </ul>
            </div>
        )
    }

  


    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>Product price: ${p.price}</h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(p.createdAt).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };*/

    const userId=isAuthenticated() && isAuthenticated().user._id;

    return (
        <React.Fragment>
            <Menu />
            <Layout title="DashBoard" description="User Dashboard" className="container">    

            <h2 className="mb-4">My Books</h2>
            <div className="row">
            
                {currentBookList.map((product,i)=>(
                    <div key={i} className="col-12 mb-3">
                    <MyCard  product={product} viewProduct={true} unlistButton={false} showDeleteButton={true} listButton={true} run={run} runSetter={setRun}/>
                    </div>
                ))}
                
            </div>

            <h2 className="mb-4">Listed Books</h2>
            <div className="row">
            
                {listedBooks.map((product,i)=>(
                    <div key={i} className="col-12 mb-3">
                    <MyCard  product={product} viewProduct={true} unlistButton={true} run={run} runSetter={setRun}/>
                    </div>
                ))}
                
            </div>
        </Layout>
        </React.Fragment>
        
    )  
}

export default Dashboard;

