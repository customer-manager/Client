import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css'; 

const CustomNavbar = () => {
  return (
    <Navbar bg="primary" style={{display:"flex",alignItems:"center",justifyContent:"space-between",color:"white",padding:"30px"}}>
        <Navbar.Brand href="#home" className="navbar-brand">
        Dream <small>Güzellik merkezi</small>
      </Navbar.Brand>
      <Form className="d-flex search-form"> {/* Adjusted className */}
          <FormControl type="text" placeholder="search..." className="mr-sm-2 search-input" />
          <Button variant="outline-light">Ara</Button>
        </Form>
    </Navbar>
  );
};

export default CustomNavbar;
