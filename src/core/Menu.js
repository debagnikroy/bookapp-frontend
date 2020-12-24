import React,{Fragment} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {signout,isAuthenticated} from '../auth';
const Menu=(props)=>{

    const isActive=(history,path)=>{
        if(history.location.pathname===path)
            return {color: '#ff9900'}
        else 
            return {color: '#ffffff'}

    }
    return(
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" to="/" style={isActive(props.history,"/")}>Home</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/shop" style={isActive(props.history,"/shop")}>Shop</Link>
                </li>
                
                <li className="nav-item">
                    <Link className="nav-link" to="/cart" style={isActive(props.history,"/cart")}>
                        Cart{" "} 
                        <sub><small className="cart-badge">{itemTotal()}</small></sub>
                    </Link>
                </li>

                {isAuthenticated() && isAuthenticated().user.role===0 && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/user/dashboard" style={isActive(props.history,"/user/dashboard")}>Dashboard</Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role===1 && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/dashboard" style={isActive(props.history,"/admin/dashboard")}>Dashboard</Link>
                    </li>
                )}  


                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin" style={isActive(props.history,"/signin")}>Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup" style={isActive(props.history,"/signup")}>Signup</Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && (
                    <li className="nav-item">
                    <span className="nav-link" onClick={()=>{
                        signout(()=>{
                            props.history.push("/");
                        });
                    }} 
                    style={{cursor:'pointer',color:'#ffffff'}}>
                        Signout
                    </span>
                </li>
                )}
                
            </ul>
        </div>
    )
}

export default withRouter(Menu);
