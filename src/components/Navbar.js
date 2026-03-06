import React, { useState, useEffect } from 'react';
import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Check for token changes every second
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem('token');
      if (currentToken !== token) {
        setToken(currentToken);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location = '/';
  };

  return (
    <BSNavbar bg="light" expand="lg" className="fade-in">
      <Container>
        <BSNavbar.Brand as={Link} to="/">
          Quiz Maker
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/quizzes">
              Quizzes
            </Nav.Link>
            {token && (
              <>
                <Nav.Link as={Link} to="/myquizzes">
                  My Quizzes
                </Nav.Link>
                <Nav.Link as={Link} to="/create">
                  Create
                </Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            )}
            {!token && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}
