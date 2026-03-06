const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
const connectDB = require('./config/db');

async function seed() {
  try {
    await connectDB();
    console.log('Connected to DB, seeding quizzes...');

    // check if any quizzes already exist
    const count = await Quiz.countDocuments();
    if (count > 0) {
      console.log('Quizzes already exist, skipping seeding.');
      process.exit(0);
    }

    const sampleQuizzes = [
      {
        title: 'Basic Math Quiz',
        description: 'A short quiz on basic arithmetic.',
        questions: [
          {
            text: 'What is 2 + 2?',
            options: ['3', '4', '5', '6'],
            correctIndex: 1
          },
          {
            text: 'What is 10 - 4?',
            options: ['5', '6', '7', '8'],
            correctIndex: 1
          }
        ]
      },
      {
        title: 'Capital Cities',
        description: 'Test your knowledge of world capitals.',
        questions: [
          {
            text: 'What is the capital of France?',
            options: ['London', 'Berlin', 'Paris', 'Rome'],
            correctIndex: 2
          },
          {
            text: 'What is the capital of Japan?',
            options: ['Tokyo', 'Beijing', 'Seoul', 'Bangkok'],
            correctIndex: 0
          }
        ]
      },
      {
        title: 'Programming Languages',
        description: 'Which language is used for ...?',
        questions: [
          {
            text: 'Which language is primarily used for Android development?',
            options: ['Java', 'Python', 'Ruby', 'Swift'],
            correctIndex: 0
          },
          {
            text: 'Which language is famous for data analysis and ML?',
            options: ['JavaScript', 'C#', 'Python', 'Go'],
            correctIndex: 2
          }
        ]
      }
    ];

    await Quiz.insertMany(sampleQuizzes);
    console.log('Seeding completed.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
