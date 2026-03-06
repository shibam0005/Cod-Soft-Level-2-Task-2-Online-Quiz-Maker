import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container className="text-center mt-5 fade-in">
      <h1>Welcome to the Quiz Maker</h1>
      <p>Create and take quizzes with ease.</p>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/create">
          <Button variant="primary">Create a Quiz</Button>
        </Link>
        <Link to="/quizzes">
          <Button variant="secondary">Browse Quizzes</Button>
        </Link>
      </div>
    </Container>
  );
}
