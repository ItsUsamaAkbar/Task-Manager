import '../App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
import Profile from '../assets/Profile.jpg';
import 'reactjs-popup/dist/index.css';
import Send from '../assets/send.svg';
import {
  Row,
  Col,
  FormControl,
  InputGroup,
  Button,
  Form,
  Card,
  DropdownButton,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Comments(props) {
  const [singleDoc, setSingleDoc] = useState({});
  const [input, setInput] = useState([]);
  const [list, setList] = useState([]);
  const [namelist, setNameList] = useState([]);
  const [comments, setComments] = useState([]);
  const [singleDocName, setSingleDocName] = useState({});
  const [id, setID] = useState('');

  useEffect(() => {
    setID(window.location.search.split('=')[1]);
  }, [null]);

  useEffect(() => {
    doc(window.location.search.split('=')[1]);
  }, [null]);

  function doc(id) {
    db.collection('users')
      .doc(id)
      .get()
      .then((Snapshot) => {
        setSingleDoc(Snapshot.data());
      });
  }

  // function doc(id) {
  //   db.collection('users')
  //     .doc(id)
  //     .collection('Task')
  //     .doc('L3hbiW2kmENayuDjQveB')
  //     .collection('Comments')
  //     .get()
  //     .then((Snapshot) => {
  //       setSingleDoc(Snapshot.data());
  //     });
  // }

  function popup() {
    db.collection('Task').doc(id).add({
      Msg: comments,
    });
    setTimeout(function () {
      window.location.href = '/Document?id=' + id;
    }, 2000);
    toast.success('Comment Added!', {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
      .doc('4rNDuIxqjytRhJJmez5j')
      .collection('Comments')
      .onSnapshot(function (querySnapshot) {
        //uselist(
        let x = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          Messages: doc.data().Messages,
        }));
        setList(x);
        // );
        console.log(list);
      });
  }

  function addTodo() {
    console.log('addTodo Called!');
    db.collection('users')
      .doc(id)
      .collection('Task')
      .doc('4rNDuIxqjytRhJJmez5j')
      .collection('Comments')
      .add({
        Messages: comments,
      });
    setInput('');
    toast.success('Comment Added!', {
      position: 'bottom-right',
      autoClose: 100,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div>
      <Row style={{ display: 'flex', alignItems: 'center' }}>
        <img className="profile" src={Profile} alt="Profile"></img>
        <h3>{singleDoc.displayName}</h3>
      </Row>
      <Row style={{ display: 'inline-grid', float: 'right' }}>
        {list.length > 0
          ? list.map((Comments, key) => (
              <div key={key} className="msgrow">
                <div>
                  <Row className="msgrow">
                    <h5 className="msgtext">{Comments.Messages}</h5>
                  </Row>
                </div>
              </div>
            ))
          : null}
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <Row className="inputstyle">
          <Col md={7}>
            {' '}
            <input
              value={comments}
              style={{ border: 'none' }}
              onChange={(e) => {
                setComments(e.target.value);
                console.log(`The Task Name is ${e.target.value}`);
              }}
              placeholder="Comments"
              className="inputbar"
            ></input>
          </Col>
          <Col></Col>
          <Col style={{ marginLeft: '10px' }} md={3}>
            <img
              className="sendbtn"
              onClick={addTodo}
              src={Send}
              alt="send"
            ></img>
          </Col>
        </Row>
      </Row>
      <ToastContainer />
    </div>
  );
}
export default Comments;
