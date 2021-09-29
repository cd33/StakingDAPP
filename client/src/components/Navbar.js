import React from "react";
import {Navbar, Container} from 'react-bootstrap';

const NavbarCustom = ({accounts}) => (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Container>
      <Navbar.Brand href="#home">StakingDAPP</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {accounts !== null && accounts[0]}
        </Navbar.Text>
      </Navbar.Collapse>
      </Container>
    </Navbar>
);

export default NavbarCustom;