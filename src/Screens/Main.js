import '../App.css';
import Add from '../assets/Add.png';
import Menu from '../assets/link.png';
import React from 'react';
import '../App.css';
import { useEffect, useState } from 'react';
import { firebaseApp } from '../firebase';
import { db } from '../firebase';
import Logo from '../assets/TodoLogo.jpg';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Main(props) {
  const [list, setList] = useState([]);
  const [id, setID] = useState('');
  useEffect(() => {
    setID(props.Userid);
    console.log('id is', id);
  }, [id]);

  useEffect(() => {
    if ('' !== id) {
      getTodo();
    }
  }, [id]);

  function handleLogout() {
    firebaseApp.auth().signOut();
  }
  function getTodo() {
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
  return (
    <div className="main">
      <Row className="mt-3">
        <Col md={11} style={{ justifyContent: 'center' }} className="Appname">
          <img className="Logo" src={Logo} alt="Logo"></img>
          <h2 className="Name">Task Manager</h2>
        </Col>
        <Col md={1}>
          <Button onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <h3 style={{ color: 'black' }}>My Tasks</h3>
      </Row>
      <Row>
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
                            pathname: '/Document?id=' + Task.id,
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
  );
}

export default Main;
