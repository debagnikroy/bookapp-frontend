import React from 'react';
import "../styles.css";


const Layout=({title="Title",className,description="Description",children})=>{
    return(
        <div>
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>

        </div>
    )
}

export default Layout;