import '../App.css';
import React from 'react';
import { firestore } from 'firebase';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import Login from './Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Form,
} from 'react-bootstrap';
function Home() {
  const [input, setInput] = useState([]);
  const [start, setStart] = useState([]);
  const [disc, setDisc] = useState([]);
  const [end, setEnd] = useState([]);
  const [list, setList] = useState([]);
  const [showbutton, setshowbutton] = useState([]);
  const [id, setID] = useState('');
  useEffect(() => {
    setID(window.location.search.split('=')[1]);
    console.log('id is', id);
  }, []);

  useEffect(() => {
    getTodo();
  }, [null]);
  function getTodo() {
    console.log('getTodo Called!');
    db.collection('Task').onSnapshot(function (querySnapshot) {
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
  function addTodo() {
    console.log('addTodo Called!');
    db.collection('users').doc(id).collection('Task').add({
      Name: input,
      StartDate: start,
      EndDate: end,
      Discription: disc,
      inProgress: false,
    });
    getTodo();
    setInput('');
    getTodo();
    toast.success('Task Added!', {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(function () {
      window.location.href = `/Login?ID=${id}`;
    }, 3000);
  }

  // function addTodo() {
  //   console.log("addTodo Called!");
  //   db.collection("Task").add({
  //     Name: input,
  //     StartDate: start,
  //     EndDate: end,
  //     Discription: disc,
  //     inProgress: false,
  //   });
  //   setInput("");
  //   getTodo();
  //   toast.success("Task Added!", {
  //     position: "bottom-right",
  //     autoClose: 1500,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  //   setTimeout(function () {
  //     window.location.href = "/Main";
  //   }, 2500);
  // }

  return (
    <div className="main">
      <Row className="page2heading">
        <Row className="maintaskheading">
          <h3> Add Your Task!</h3>
        </Row>
        <Row className=" mt-4 taskheading">
          <h5>Enter Your Task Name</h5>
          <InputGroup className="mb-3">
            <FormControl
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                console.log(`The Task Name is ${e.target.value}`);
              }}
              placeholder="Task Name"
              aria-label="Task Name"
            />
          </InputGroup>
        </Row>
        <Row>
          <Col>
            <h5>Start Date</h5>
            <InputGroup className="mb-3">
              <FormControl
                value={start}
                onChange={(e) => {
                  setStart(e.target.value);
                  console.log(`The Task Name is ${e.target.value}`);
                }}
                type="date"
                placeholder="dd/mm/yyyy"
                aria-label="dd/mm/yyyy"
              />
            </InputGroup>
          </Col>
          <Col>
            <h5>End Date</h5>
            <InputGroup className="mb-3">
              <FormControl
                value={end}
                onChange={(e) => {
                  setEnd(e.target.value);
                  console.log(`The Task Name is ${e.target.value}`);
                }}
                type="date"
                placeholder="dd/mm/yyyy"
                aria-label="dd/mm/yyyy"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <h5>Discription</h5>
          <Form.Group
            style={{ marginLeft: '20px' }}
            value={disc}
            onChange={(e) => {
              setDisc(e.target.value);
              console.log(`The Task Name is ${e.target.value}`);
            }}
            className="input"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Control
              style={{ height: '30vh', width: '80vh' }}
              as="textarea"
              rows="3"
            />
          </Form.Group>
        </Row>

        <Row
          style={{ display: 'flex', alignItems: 'baseline' }}
          className=" mt-3 mb-3"
        >
          <Col style={{ textAlign: 'center' }}>
            <Button
              onClick={() => {
                window.location.href = `/Login?ID=${id}`;
              }}
              className="btn"
              variant="danger"
            >
              Back
            </Button>
          </Col>
          <Col className="mt-4" style={{ textAlign: 'center' }}>
            <Button onClick={addTodo} className="btn" variant="primary">
              Submit
            </Button>
          </Col>
        </Row>
      </Row>
      <ToastContainer />
    </div>
  );
}

export default Home;
