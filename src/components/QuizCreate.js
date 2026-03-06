import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import CustomFloatingLabel from './CustomFloatingLabel';
import api from '../services/api';

export default function QuizCreate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to create a quiz');
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // Load quiz data when editing
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      api.get(`/quizzes/${id}`)
        .then(res => {
          setTitle(res.data.title);
          setDescription(res.data.description || '');
          setQuestions(res.data.questions || []);
        })
        .catch(err => {
          console.error(err);
          alert('Failed to load quiz');
          navigate('/myquizzes');
        });
    }
  }, [id, navigate]);

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', ''], exactAnswer: '' }]);
  };

  const removeQuestion = idx => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleQuestionChange = (idx, field, value) => {
    const newQs = [...questions];
    newQs[idx][field] = value;
    setQuestions(newQs);
  };

  const handleOptionChange = (qIdx, oIdx, value) => {
    const newQs = [...questions];
    newQs[qIdx].options[oIdx] = value;
    setQuestions(newQs);
  };

  const addOption = qIdx => {
    const newQs = [...questions];
    newQs[qIdx].options.push('');
    setQuestions(newQs);
  };

  const submit = e => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].text.trim()) {
        alert(`Please fill in question ${i + 1}`);
        return;
      }
      if (questions[i].options.some(opt => !opt.trim())) {
        alert(`Please fill in all options for question ${i + 1}`);
        return;
      }
      if (!questions[i].exactAnswer || !questions[i].exactAnswer.trim()) {
        alert(`Please enter exact answer for question ${i + 1}`);
        return;
      }
    }
    
    const quizData = { title, description, questions };
    
    const apiCall = isEditing 
      ? api.put(`/quizzes/${id}`, quizData)
      : api.post('/quizzes', quizData);
    
    apiCall
      .then(res => {
        alert(isEditing ? 'Quiz updated successfully!' : 'Quiz created successfully!');
        navigate('/myquizzes');
      })
      .catch(err => {
        console.error(err);
        alert(err.response?.data?.msg || 'Failed to save quiz');
      });
  };

  return (
    <Container className="mt-5 fade-in">
      <h2>{isEditing ? 'Edit Quiz' : 'Create New Quiz'}</h2>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3">
          <CustomFloatingLabel
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <CustomFloatingLabel
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>
        {questions.map((q, qi) => (
          <div key={qi} className="border p-3 mb-3 fade-in">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Question {qi + 1}</h5>
              <Button variant="danger" size="sm" onClick={() => removeQuestion(qi)}>
                Delete
              </Button>
            </div>
            <Form.Group className="mb-2">
              <CustomFloatingLabel
                label={`Question ${qi + 1}`}
                value={q.text}
                onChange={e => handleQuestionChange(qi, 'text', e.target.value)}
                required
              />
            </Form.Group>
            {q.options.map((opt, oi) => (
              <Form.Group className="mb-2" key={oi}>
                <CustomFloatingLabel
                  label={`Option ${oi + 1}`}
                  value={opt}
                  onChange={e => handleOptionChange(qi, oi, e.target.value)}
                  required
                />
              </Form.Group>
            ))}
            <Button variant="secondary" size="sm" onClick={() => addOption(qi)}>
              Add Option
            </Button>
            <Form.Group className="mt-2">
              <CustomFloatingLabel
                label="Exact Answer"
                value={q.exactAnswer || ''}
                onChange={e => handleQuestionChange(qi, 'exactAnswer', e.target.value)}
                required
              />
            </Form.Group>
          </div>
        ))}
        <Button variant="primary" onClick={addQuestion}>Add Question</Button>
        <div className="mt-3">
          <Button type="submit">{isEditing ? 'Update Quiz' : 'Save Quiz'}</Button>
          {isEditing && (
            <Button variant="secondary" className="ms-2" onClick={() => navigate('/myquizzes')}>
              Cancel
            </Button>
          )}
        </div>
      </Form>
    </Container>
  );
}
