import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export default function QuizResult() {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) return <Container className="fade-in">No result available.</Container>;
  const { quiz, answers, score } = state;
  return (
    <Container className="mt-5 fade-in">
      <h2>Result for {quiz.title}</h2>
      <p>
        You scored {score} out of {quiz.questions.length}
      </p>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {quiz.questions.map((q, idx) => {
            const answer = answers[idx];
            let userAnswer = '';
            let isCorrect = false;
            
            if (answer?.type === 'text') {
              userAnswer = answer.value;
              isCorrect = answer.value.toLowerCase().trim() === q.exactAnswer.toLowerCase().trim();
            }
            
            return (
              <tr key={idx} className={`fade-in ${isCorrect ? 'table-success' : 'table-danger'}`}>
                <td>{idx + 1}</td>
                <td>{q.text}</td>
                <td>{userAnswer}</td>
                <td>{q.exactAnswer}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button onClick={() => navigate('/')}>Back to Home</Button>
    </Container>
  );
}

