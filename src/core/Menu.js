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
                    <Link className="nav-link" to="/" style={isActive(props.history,"/")}>Dashboard</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/transferMarket" style={isActive(props.history,"/transferMarket")}>Transfer Market</Link>
                </li>
                
                <li className="nav-item">
                    <Link className="nav-link" to="/user/addBook" style={isActive(props.history,"/user/addBook")}>
                        Add Book
                        {/* <sub><small className="cart-badge">{itemTotal()}</small></sub> */}
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/" style={isActive(props.history,"/")}>
                        Notification{" "} 
                        {/* <sub><small className="cart-badge">{itemTotal()}</small></sub> */}
                    </Link>
                </li>

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
