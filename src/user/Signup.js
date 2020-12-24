import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';
import {authenticate,isAuthenticated} from '../auth';


const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <div className="row mt-5">
  <div className="col-md-6 m-auto">
  
  
  
    <div className="card card-body">
      <h1 className="text-center mb-3">
        Register
      </h1>
     
      <form>
	  
        <div className="form-group">		
          <label for="name">Name</label>
          <input
            type="name"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter Name"
            value=""
            required
			onChange={handleChange('name')}
          />		  
        </div>
		
		
        <div className="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter Email"
            value=""
            required
			onChange={handleChange('email')}
          />
        </div>
		
		
        <div className="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Create Password"
            value=""
            required
			onChange={handleChange('password')}
          />
        </div>
        
        <button onClick={clickSubmit} className="btn btn-primary btn-block">
          Register
        </button>
      </form>
      <p className="lead mt-4">Have An Account? <Link to="/signin">Login</Link></p>
    </div>
  </div>
</div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <Layout
            title="Signup"
            description="Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {isAuthenticated()?<Redirect to="/user/dashboard" /> :null}
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;
