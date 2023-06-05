import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col } from 'react-bootstrap';

import navlogo from './figures/DoubleBogey.png';


function NavBar() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        /* Mobile View */
        <>
          <Navbar bg="light" variant="light" style={{border: '1px'}} expand="lg" collapseOnSelect expanded={showMobileMenu}>
            <Container fluid fixed="top">
              <NavbarBrand href="/" className="ml-3 mr-auto">
                <img alt="double bogey logo" src={navlogo} height="40" />
              </NavbarBrand>
              <Navbar.Toggle aria-controls="mobile-navbar" onClick={toggleMobileMenu} className="mr-3" />
              <Navbar.Collapse id="mobile-navbar">
                <Nav className="text-center dropdown-options">
                  <NavItem>
                    <NavLink href="/myprofile">My Profile</NavLink>
                    <NavLink href="/courseOverview">Course Information</NavLink>
                    <NavLink href="/share">Share</NavLink>
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Navbar
            fixed="bottom"
            bg="light"
            variant="light"
            className="custom-navbar-bottom" // Add custom class name
          >
            <Nav className="navbar-options">
              <NavLink href="/news" className="navbar-option">
                News
              </NavLink>
              <NavLink href="/" className="navbar-option">
                <b>Scorecard</b>
              </NavLink>
              <NavLink href="/topScores" className="navbar-option">
                Top Scores
              </NavLink>
            </Nav>
          </Navbar>
        </>
      ) : (
        /* Desktop View */
        <Navbar variant="light" bg="light">
          <Container>
            <Col className="text-center">
              <Row>
                <NavbarBrand href="/">
                  <img
                    alt="double bogey logo"
                    src={navlogo}
                    height="75"
                    style={{ marginTop: '15px', marginBottom: '5px' }}
                  />
                </NavbarBrand>
              </Row>
              <Row>
                <Nav className="justify-content-center fs-4">
                  <NavLink className="nav-link-spacing" href="/">Home</NavLink>
                  <NavLink className="nav-link-spacing" href="/">Scorecard</NavLink>
                  <NavLink className="nav-link-spacing" href="/news">News</NavLink>
                  <NavLink className="nav-link-spacing" href="/topScores">Top Scores</NavLink>
                  <NavLink className="nav-link-spacing" href="/myprofile">My Profile</NavLink>
                </Nav>
              </Row>
            </Col>
          </Container>
        </Navbar>
      )}
    </>
  );
}


export default NavBar;