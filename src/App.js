import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import QuizList from './components/QuizList';
import MyQuizzes from './components/MyQuizzes';
import QuizCreate from './components/QuizCreate';
import QuizTake from './components/QuizTake';
import QuizResult from './components/QuizResult';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import ThreeBackground from './components/ThreeBackground';

function App() {
  return (
    <Router>
      <ThreeBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/myquizzes" element={<MyQuizzes />} />
        <Route path="/create" element={<QuizCreate />} />
        <Route path="/edit/:id" element={<QuizCreate />} />
        <Route path="/take/:id" element={<QuizTake />} />
        <Route path="/result" element={<QuizResult />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
