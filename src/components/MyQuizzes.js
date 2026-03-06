import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/quizzes/my')
      .then(res => {
        setQuizzes(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await api.delete(`/quizzes/${id}`);
        setQuizzes(quizzes.filter(q => q._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete quiz');
      }
    }
  };

  const handlePublish = async (id) => {
    try {
      const res = await api.put(`/quizzes/${id}/publish`);
      setQuizzes(quizzes.map(q => q._id === id ? res.data : q));
    } catch (err) {
      console.error(err);
      alert('Failed to update quiz');
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 fade-in">
        <h2>My Quizzes</h2>
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Quizzes</h2>
        <Link to="/create">
          <Button variant="primary">Create New Quiz</Button>
        </Link>
      </div>
      
      {quizzes.length === 0 ? (
        <Card className="text-center">
          <Card.Body>
            <Card.Title>No quizzes yet</Card.Title>
            <Card.Text>You haven't created any quizzes yet.</Card.Text>
            <Link to="/create">
              <Button variant="primary">Create Your First Quiz</Button>
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {quizzes.map(q => (
            <Col key={q._id} md={6} lg={4} className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{q.title}</Card.Title>
                  <Card.Text>{q.description}</Card.Text>
                  <Card.Text className="text-muted">
                    {q.questions.length} question{q.questions.length !== 1 ? 's' : ''}
                  </Card.Text>
                  <div className="mb-2">
                    {q.published ? (
                      <Badge bg="success">Published</Badge>
                    ) : (
                      <Badge bg="secondary">Draft</Badge>
                    )}
                  </div>
                  <div className="d-flex gap-2 flex-wrap">
                    <Link to={`/edit/${q._id}`}>
                      <Button variant="primary" size="sm">Edit</Button>
                    </Link>
                    <Button 
                      variant={q.published ? "warning" : "success"} 
                      size="sm"
                      onClick={() => handlePublish(q._id)}
                    >
                      {q.published ? "Unpublish" : "Publish"}
                    </Button>
                    <Link to={`/take/${q._id}`}>
                      <Button variant="info" size="sm">Preview</Button>
                    </Link>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDelete(q._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

