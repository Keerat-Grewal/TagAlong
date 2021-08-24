import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../logo_3.png';
import '../styles/navigation.css';
import CreateRide from './Ride';
import FindRide from './FindRide';
import NavProfile from './NavProfile';
import FindProfile from './FindProfile';
import ReportProfile from './ReportProfile';
import Team from './Team';
import Reset from '../reset_button3.png';

export default function Navigation(props) {
  const [filter, setFilter] = useState('');

  const handleClick = () => {
    setFilter('');
  };

  useEffect(() => {
    if (props.filter !== null) props.update(filter);
  }, [filter]);

  return (
    <Navbar bg="light" expand="lg">
      {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
      <Navbar.Brand>
        <Link to="/">
          <Image id="logo" src={Logo} />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {!props.display
            && (
            <Nav className="mr-auto">
              <Nav.Link style={{ color: '#E84F11', border: '#E84F11', fontFamily: 'Verdana' }} href="/">Home</Nav.Link>
            </Nav>
            )}
        {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        {props.display && <CreateRide />}
        {props.display && <FindRide update={setFilter} />}
        {props.display && <Image id="reset" src={Reset} onClick={handleClick} />}
        {props.display && <FindProfile />}
        {props.display && <ReportProfile />}
        {props.display && <Team />}
      </Navbar.Collapse>
      {/* <Logout></Logout> */}
      <NavProfile />
    </Navbar>

  );
}
