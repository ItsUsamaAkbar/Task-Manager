import '../App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Login from './Login';
import Comments from './Comments';
import {
  Row,
  Col,
  FormControl,
  InputGroup,
  Button,
  Card,
  DropdownButton,
} from 'react-bootstrap';
function Document(props) {
  console.log();
  const [_state, setState] = useState({});
  const alert = useAlert();
  const [singleDoc, setSingleDoc] = useState({});
  const [list, setList] = useState([]);
  const [singleDocName, setSingleDocName] = useState({});
  const [singleDocDisc, setSingleDocDisc] = useState({});
  const [singleDocStart, setSingleDocStart] = useState({});
  const [singleDocEnd, setSingleDocEnd] = useState({});
  const [id, setID] = useState('');
  const [taskid, setTaskid] = useState('');
  const [comments, setComments] = useState({});
  useEffect(() => {
    setID(window.location.search.split('=')[1]);
    console.log('id is', id);
  }, [id]);
  useEffect(() => {
    doc(window.location.search.split('=')[1]);
  }, [null]);
  // useEffect(() => {
  //   getdata();
  // }, [null]);

  function doc(id) {
    db.collection('users')
      .doc(id)
      .collection('Task')
      .doc('L3hbiW2kmENayuDjQveB')
      .get()
      .then((Snapshot) => {
        setSingleDoc(Snapshot.data());
        setSingleDocDisc(Snapshot.data()['Discription']);
        setSingleDocName(Snapshot.data()['Name']);
        setSingleDocStart(Snapshot.data()['StartDate']);
        setSingleDocEnd(Snapshot.data()['EndDate']);
        setComments(Snapshot.data()['Comments']);
      });
  }

  function Update() {
    console.log('addTodo Called!');
    db.collection('users')
      .doc(id)
      .collection('Task')
      .doc('L3hbiW2kmENayuDjQveB')
      .update({
        Name: singleDocName,
        StartDate: singleDocStart,
        EndDate: singleDocEnd,
        Discription: singleDocDisc,
        inProgress: false,
      });
    toast.info('Updated!', {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  function deleteDoc() {
    db.collection('users')
      .doc(id)
      .collection('Task')
      .doc('L3hbiW2kmENayuDjQveB')
      .delete();
    toast.error('Deleted!', {
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
    }, 2500);
  }
  function popup() {
    db.collection('Task').doc(id).update({
      Comments: comments,
    });

    toast.success('Comment Added!', {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className="main">
      <Card className="text-center">
        <Card.Header>
          <h2>Detail</h2>
        </Card.Header>
        <Card.Body>
          <Row className="page2heading">
            <Row style={{ justifyContent: 'space-between' }} className=" mt-4 ">
              <h5>Task Name :</h5>
              <InputGroup style={{ width: '500px' }} className="mb-3">
                <FormControl
                  style={{ border: 'none' }}
                  value={singleDocName}
                  onChange={(e) => {
                    setSingleDocName(e.target.value);
                    console.log(`The Task Name is ${e.target.value}`);
                  }}
                  placeholder="Name"
                />
              </InputGroup>
            </Row>
            <Row style={{ justifyContent: 'space-between' }}>
              <h5>Start Date :</h5>
              <InputGroup style={{ width: '500px' }} className="mb-3">
                <FormControl
                  style={{ border: 'none' }}
                  value={singleDocStart}
                  onChange={(e) => {
                    setSingleDocStart(e.target.value);
                    console.log(`The Task Name is ${e.target.value}`);
                  }}
                  placeholder="StartDate"
                />
              </InputGroup>
            </Row>
            <Row style={{ justifyContent: 'space-between' }}>
              <h5>End Date :</h5>
              <InputGroup style={{ width: '500px' }} className="mb-3">
                <FormControl
                  style={{ border: 'none' }}
                  value={singleDocEnd}
                  onChange={(e) => {
                    setSingleDocEnd(e.target.value);
                    console.log(`The Task Name is ${e.target.value}`);
                  }}
                  placeholder="EndDate"
                />
              </InputGroup>
            </Row>
            <Row style={{ justifyContent: 'space-between' }}>
              <h5>Discription :</h5>
              <InputGroup style={{ width: '500px' }} className="mb-3">
                <FormControl
                  value={singleDocDisc}
                  style={{ border: 'none' }}
                  onChange={(e) => {
                    setSingleDocDisc(e.target.value);
                    console.log(`The Task Name is ${e.target.value}`);
                  }}
                  placeholder="Discription"
                />
              </InputGroup>
            </Row>
          </Row>
        </Card.Body>
      </Card>
      <Row style={{ marginTop: '10px', justifyContent: 'center' }}>
        <Col md={3}>
          <Button
            style={{ width: '230px' }}
            onClick={() => {
              window.location.href = `/Login?ID=${id}`;
            }}
            className="btn"
            variant="primary"
          >
            Back
          </Button>
        </Col>
        <Col md={3}>
          {/* <Popup
            trigger={(open) => (
              <Button className="btn" variant="danger">
                Delete - {open ? "Opened" : "Closed"}
              </Button>
            )}
            position="right center"
            closeOnDocumentClick
          >
            <span> Popup content </span>
          </Popup>
          ; */}
          {/* <Popup
            trigger={(open) => <Button open={open} />}
            position="right center"
            closeOnDocumentClick
          >
            <span> Popup content </span>
          </Popup> */}
          <Popup
            trigger={
              <Button
                style={{ width: '230px' }}
                className="btn"
                variant="danger"
              >
                Delete
              </Button>
            }
            position="center"
          >
            {(close) => (
              <div>
                <h6 style={{ textAlign: 'center' }} className="mt-1">
                  Are You Sure That You Want to Delete this?
                </h6>
                <Row
                  className="mt-3 mb-1"
                  style={{ justifyContent: 'space-around' }}
                >
                  <Button onClick={deleteDoc} className="btn" variant="danger">
                    Delete
                  </Button>

                  <Button
                    onClick={() => {
                      console.log('modal closed ');
                      close();
                    }}
                    className="btn"
                    variant="success"
                  >
                    Cancel
                  </Button>
                </Row>
              </div>
            )}
          </Popup>
        </Col>{' '}
        <Col md={3}>
          <Button
            style={{ width: '230px' }}
            onClick={Update}
            className="btn"
            variant="warning"
          >
            Update
          </Button>
        </Col>
      </Row>
      <Comments />
    </div>
  );
}
export default Document;
