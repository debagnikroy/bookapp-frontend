import React, { useState } from 'react';
import {Link,Redirect} from 'react-router-dom';
import ShowImage from './ShowImage'
import {addItem,updateItem,deleteItem} from './cartHelpers';

const Card=({product,showViewProductButton=true,showAddToCartButton=true,cartUpdate=false,showRemoveProductButton=false,run,setRun})=>{

    const [redirect,setRedirect]=useState(false);
    const [count,setCount]=useState(product.count);
    const showViewButton=(showViewProductButton)=>{
        if(showViewProductButton){
            return(
                <Link to={`/product/${product._id}`} >
                    <button className="btn btn-outline-primary m-2">View Product</button>
                </Link>
                
            )
        }        
    }

    
    const showDeleteButton=(showRemoveProductButton)=>{
        if(showRemoveProductButton){
            return(                
                <button className="btn btn-outline-danger m-2"
                        onClick={()=>{
                            deleteItem(product._id);
                            setRun(!run);
                        }}
                >
                    Delete Product
                </button>                
                
            )
        }        
    }
    const showCartButton=(showAddToCartButton)=>{
        if(showAddToCartButton){
            return(
                <button onClick={addToCart} className="btn btn-outline-warning mt-2 ml-2 mb-2">
                    Add to cart
                </button>            
            )
        }        
    }
    const addToCart=()=>{
        addItem(product,()=>{
            setRedirect(true);
        })
    }
    const shouldRedirect=redirect=>{
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const handleChange=productId=>event=>{
        setCount(event.target.value<1?1:event.target.value);
        if(event.target.value>=1){
            updateItem(productId,event.target.value);
            setRun(!run);
        }
    }

    const showCartUpdateOptions=cartUpdate=>{
        return cartUpdate && (<div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
            </div>
        </div>)
    }
    return (
            <div className="card">
                <div className="card-header">{product.name}</div>
                <div clasn="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product" />
                    <p className="ml-2">{product.description.length>20?product.description.substring(0,20)+"...":product.description}</p>
                    <p className="ml-2">${product.price}</p>
                    <span>
                            {
                                showViewButton(showViewProductButton)
                            }                            
                       
                            {showCartButton(showAddToCartButton)}
                            
                            {showCartUpdateOptions(cartUpdate)}
                            {showDeleteButton(showRemoveProductButton)}
                    </span>                    
                </div>
            </div>                
    )
}

export default Card;