import React, { Component, useRef } from 'react';
import { useEffect } from 'react';
import { auth, createUserDocument } from '../firebase';
import {
  Card,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Singup extends Component {
  state = { displayName: '', email: '', password: '' };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, displayName } = this.state;
    let UserID;
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocument(user, { displayName });
      UserID = user.uid;
      console.log(user.uid);
    } catch (error) {
      console.log('error', error);
    }
    this.setState({ displayName: '', email: '', password: '' });
    setTimeout(function () {
      console.log(UserID);
      window.location.href = `/Login?ID=${UserID}`;
    }, 1);
  };

  render() {
    const { displayName, email, password } = this.state;
    return (
      // <div>
      //   <Row
      //     style={{
      //       justifyContent: 'center',
      //       padding: '5px',
      //     }}
      //   >
      //     <h3>Get Started</h3>
      //   </Row>
      //   <Row className=" mt-4 loginbar">
      //     <h5>Name</h5>

      //     <InputGroup className="mb-3">
      //       <FormControl
      //         value={displayName}
      //         onChange={this.handleChange}
      //         type="input"
      //         placeholder="Enter Name"
      //         aria-label="Enter Name"
      //       />
      //     </InputGroup>
      //   </Row>
      //   <Row className=" mt-4 loginbar">
      //     <h5>E-mail</h5>

      //     <InputGroup className="mb-3">
      //       <FormControl
      //         value={email}
      //         onChange={this.handleChange}
      //         type="email"
      //         placeholder="Enter E-mail"
      //         aria-label="Enter E-mail"
      //       />
      //     </InputGroup>
      //   </Row>
      //   <Row className=" mt-4 loginbar">
      //     <h5>Password</h5>
      //     <InputGroup className="mb-3">
      //       <FormControl
      //         value={password}
      //         onChange={this.handleChange}
      //         type="password"
      //         placeholder="Enter Password"
      //         aria-label="Enter Password"
      //       />
      //     </InputGroup>
      //   </Row>
      //   <Row className=" mt-4 loginbar">
      //     <div className="btncontainer">
      //       <Button onClick={this.handleSubmit}>Sign up</Button>
      //       <p>
      //         Already have an Account ?{' '}
      //         <Link
      //           to={{
      //             pathname: '/Login',
      //           }}
      //         >
      //           Log in!
      //         </Link>
      //       </p>
      //     </div>
      //   </Row>
      // </div>
      <div>
        <form className="signup-login" onSubmit={this.handleSubmit}>
          <h2>Signup</h2>

          <input
            type="name"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <button>Signup</button>
          <button onClick={this.handleSubmit}>Already Signup?</button>
          <p>
            Already have an Account ?{' '}
            <Link
              to={{
                pathname: '/Login',
              }}
            >
              Log in!
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Singup;
