import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Button } from 'reactstrap';

const Header = () => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h2 className="display-3">Todo List</h2>
          <p className="lead">Created by 이지훈</p>
          <Link to="/create" >
            <Button color="success" size="lg">   New   </Button>
          </Link>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Header;