import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    api.get('/quizzes').then(res => setQuizzes(res.data)).catch(console.error);
  }, []);

  return (
    <Container className="mt-5 fade-in">
      <h2>Available Quizzes</h2>
      {quizzes.map(q => (
        <Card className="mb-3 fade-in" key={q._id}>
          <Card.Body>
            <Card.Title>{q.title}</Card.Title>
            <Card.Text>{q.description}</Card.Text>
            <Link to={`/take/${q._id}`}>
              <Button variant="success">Take Quiz</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
