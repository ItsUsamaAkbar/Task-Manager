import '../App.css';
import React from 'react';
import Start from '../assets/Getstart.jpg';
import { Row, Col, Button } from 'react-bootstrap';

function Home(props) {
  return (
    <div className="main">
      <Row style={{ justifyContent: 'center' }}>
        <img style={{ width: '30rem' }} src={Start} alt="Start"></img>
      </Row>
      <Row className="headline">
        <Col md={3}>
          <h3>Manage and Priotrize Your Task Easily</h3>
        </Col>
      </Row>
      <Row className="headline">
        <Col style={{ marginTop: '5px' }} md={4}>
          <p>
            Increase Your productivity by managing your personal and team task
            and do them based on the highest priority
          </p>
        </Col>
      </Row>
      <Col
        style={{ marginTop: '5px', justifyContent: 'center', display: 'flex' }}
      >
        <Button
          onClick={() => (window.location.href = '/Login')}
          style={{ width: '10rem' }}
          variant="primary"
          size="lg"
        >
          Get Started
        </Button>
      </Col>
    </div>
  );
}

export default Home;
