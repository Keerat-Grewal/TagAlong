
import React, {Component} from 'react';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import {Button, Form, FormControl} from 'react-bootstrap';
import {Navbar, Nav, NavDropdown, Image, NavItem, Modal} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import Logout from './Logout';
import Logo from '../Logo2.png';
import '../styles/navigation.css';
import CreateRide from './Ride'
import Searchbar from './Searchbar';
import FindRide from './FindRide';
import NavProfile from './NavProfile'

class Navigation extends Component{
    constructor(props){
        super(props);
    }
    render() {
        console.log("NAVIGATION")
        return(
            <Navbar bg="light" expand="lg">
            {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
            <Navbar.Brand>
                <Image id="logo" src={Logo} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {/* <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
              </Nav> */}
              {/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form> */}
              {this.props.canCreate && <CreateRide></CreateRide>}
              {this.props.canSearch && <FindRide/>}
              {/* <Searchbar style= {{margin: "auto"}}></Searchbar> */}
            </Navbar.Collapse>
            {/* <Logout></Logout> */}
            <NavProfile/>
          </Navbar>

        )
    }
}

export default Navigation;