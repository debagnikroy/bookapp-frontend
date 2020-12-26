import React, { useEffect,useState } from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth'
import { Link } from 'react-router-dom';
import {getTransferMarketListedBooks} from './ApiCore'
import MyCard from './MyCard';
import Menu from './Menu'

const Market=()=>{
    
    const [listedBooks,setListedBooks]=useState([]);
    const {user: {_id,name,email,role}}=isAuthenticated();  
    const [run,setRun]=useState(false);
    const token=isAuthenticated().token;   

    const init=(userId,token)=>{        
        setListedBooks([]);
        getTransferMarketListedBooks(userId,token).then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                console.log("market",data[0].listedBooks);
                setListedBooks(data[0].listedBooks);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }        
    useEffect(()=>{
        init(_id,token);        
    },[run]);

    const userId=isAuthenticated() && isAuthenticated().user._id;

    return (
        <React.Fragment>
            <Menu />
            <Layout title="Transfer Market" description="Pick ypur favourite book" className="container">    

            <h2 className="mb-4">All Books</h2>
            <div className="row">

            {listedBooks.map((product,i)=>(
            <div key={i} className="col-12 mb-3">
                <MyCard  product={product.isbn} viewProduct={true} unlistButton={false} owner={product.userId} showBorrowButton={true} run={run} runSetter={setRun}/>
            </div>
        ))}
    
        </div>                            
</Layout>
        </React.Fragment>        
    )  
}

export default Market;

