import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function QuizTake() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    api.get(`/quizzes/${id}`)
      .then(res => setQuiz(res.data))
      .catch(console.error);
  }, [id]);

  const submit = () => {
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      const answer = answers[idx];
      if (!answer || !answer.trim()) return;
      
      if (answer.toLowerCase().trim() === q.exactAnswer.toLowerCase().trim()) {
        score++;
      }
    });
    navigate('/result', { state: { quiz, answers, score } });
  };

  if (!quiz) return <Container className="fade-in">Loading...</Container>;

  return (
    <Container className="mt-5 fade-in">
      <h2>{quiz.title}</h2>
      {quiz.questions.map((q, idx) => (
        <Card className="mb-3 fade-in" key={idx}>
          <Card.Body>
            <Card.Title>{q.text}</Card.Title>
            <Form.Group className="mt-2">
              <Form.Control
                type="text"
                placeholder="Type your answer..."
                value={answers[idx] || ''}
                onChange={e => setAnswers({ ...answers, [idx]: e.target.value })}
              />
            </Form.Group>
          </Card.Body>
        </Card>
      ))}
      <Button onClick={submit}>Submit Quiz</Button>
    </Container>
  );
}
