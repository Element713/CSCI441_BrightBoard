require('dotenv').config();
const mongoose = require('mongoose');
const Quiz = require('../../server/models/Quiz');
const Lesson = require('../../server/models/Lesson');

const seedQuizzes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const lessons = await Lesson.find();
    if (lessons.length === 0) {
      console.log('No lessons found. Please seed lessons first.');
      return;
    }

    await Quiz.deleteMany();

    const quizzes = [];

    lessons.forEach((lesson, index) => {
      const quiz = {
        lessonId: lesson._id,
        questions: [
          {
            questionText: `What is the main topic of Lesson ${index + 1}?`,
            choices: ['Topic A', 'Topic B', 'Topic C', 'Topic D'],
            correctAnswerIndex: 1
          },
          {
            questionText: `Which of the following is true about ${lesson.title}?`,
            choices: ['True', 'False', 'Sometimes', 'None of the above'],
            correctAnswerIndex: 0
          }
        ]
      };
      quizzes.push(quiz);
    });

    await Quiz.insertMany(quizzes);
    console.log(`Seeded ${quizzes.length} quizzes`);
  } catch (error) {
    console.error('Error seeding quizzes:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

module.exports = seedQuizzes;