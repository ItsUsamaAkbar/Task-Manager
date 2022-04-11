import '../App.css';
import React from 'react';
import { firebaseApp } from '../firebase';
import { useEffect, useState } from 'react';
import Add from '../assets/Add.png';
import Menu from '../assets/link.png';
import { db, auth, createUserDocument } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Document from './Document';
import Logo from '../assets/TodoLogo.jpg';
import {
  Card,
  Row,
  Col,
  Button,
  Nav,
  Navbar,
  NavDropdown,
  Container,
  InputGroup,
  FormControl,
  Form,
} from 'react-bootstrap';
import Header from './Header';
import Main from './Main';
function Login() {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [emailerror, setEmailerror] = useState('');
  const [passworderror, setPassworderror] = useState('');
  const [hasaccount, setHasaccount] = useState(false);
  const [list, setList] = useState([]);
  const [id, setID] = useState('');
  function handleLogout() {
    firebaseApp.auth().signOut();
  }

  useEffect(() => {
    if ('' !== id) {
      getTodo();
    }
  }, [id]);

  function getTodo() {
    console.log('getTodo Called!');
    db.collection('users')
      .doc(id)
      .collection('Task')
      .onSnapshot(function (querySnapshot) {
        //uselist(
        let x = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          Name: doc.data().Name,
          StartDate: doc.data().StartDate,
          EndDate: doc.data().EndDate,
          Discription: doc.data().Discription,
          inProgress: doc.data().inProgress,
        }));
        setList(x);
        // );
        console.log(list);
      });
  }

  function clearInput() {
    setEmail('');
    setPassword('');
  }

  function clearError() {
    setEmailerror('');
    setPassworderror('');
  }
  function handleLogin() {
    clearError();
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailerror(err.message);
            break;
          case 'auth/wrong-password':
            setPassworderror(err.message);
        }
      });
  }

  function handlesignup() {
    clearError();
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-inuse':
          case 'auth/invalid-email':
            setEmailerror(err.message);
            break;
          case 'auth/weak-password':
            setPassworderror(err.message);
        }
      });
    createUserDocument(email, { password });
  }

  function handleLogout() {
    firebaseApp.auth().signOut();
  }

  function authListner() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInput();
        setUser(user);
        setID(user.uid);
      } else {
        setUser('');
      }
    });
  }

  useEffect(() => {
    authListner();
    console.log('id has id', id);
  });

  return (
    <div className="background">
      {user ? (
        <div className="main">
          <Row className="navbarrow">
            <Col style={{ padding: '0px' }}>
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Task Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
          <Row style={{ padding: '20px' }} className="mt-5">
            <h3 style={{ color: 'black' }}>My Tasks</h3>
          </Row>
          <Row style={{ padding: '20px' }}>
            {list.length > 0
              ? list.map((Task, key) => (
                  <Card className="cardmain" key={key}>
                    <div className=" cardshape shadow p-3 mb-3 bg-grey rounded">
                      <div className="cardtext">
                        <Row style={{ display: 'contents' }}>
                          <h4 className="Cardtext">
                            {Task.Name}

                            <Link
                              to={{
                                pathname: `/Document?ID=${id}`,
                              }}
                            >
                              <img className="Menu" src={Menu} alt="Menu"></img>
                            </Link>
                          </h4>
                        </Row>
                        <Row
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <p>{Task.StartDate}</p>
                        </Row>
                      </div>
                    </div>
                  </Card>
                ))
              : null}
          </Row>
          <Row>
            <Row style={{ position: 'fixed', bottom: '10px' }}>
              <Button
                style={{
                  background: 'none',
                  border: 'none',
                }}
                onClick={() => {
                  window.location.href = `/Registration?ID=${id}`;
                }}
              >
                <img style={{ width: '40px' }} src={Add} alt="Add"></img>
              </Button>
            </Row>
          </Row>
        </div>
      ) : (
        <div>
          <Row
            style={{
              justifyContent: 'center',
              padding: '5px',
            }}
          >
            <h3>Get Started</h3>
          </Row>
          <Row className=" mt-4 loginbar">
            <h5>E-mail</h5>

            <InputGroup className="mb-3">
              <FormControl
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log(`The Username is ${e.target.value}`);
                }}
                type="email"
                placeholder="Enter E-mail"
                aria-label="Enter E-mail"
              />
            </InputGroup>
            <p style={{ color: 'red' }}>{emailerror}</p>
          </Row>
          <Row className=" mt-4 loginbar">
            <h5>Password</h5>
            <InputGroup className="mb-3">
              <FormControl
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log(`The Password is ${e.target.value}`);
                }}
                type="password"
                placeholder="Enter Password"
                aria-label="Enter Password"
              />
            </InputGroup>
            <p style={{ color: 'red' }}>{passworderror}</p>
          </Row>
          <Row className=" mt-4 loginbar">
            <div className="btncontainer">
              <Button onClick={handleLogin}>Sign in</Button>
              <p>
                Don't have an Account ?{' '}
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => setHasaccount(!hasaccount)}
                >
                  <Link
                    to={{
                      pathname: '/Signup',
                    }}
                  >
                    Sign up?
                  </Link>
                </span>
              </p>
            </div>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Login;
