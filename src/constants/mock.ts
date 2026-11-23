import type { Question } from '@/types'

// Sample data from the Next.js home page. Fixed dates (instead of
// `new Date()`) so the server and browser render the same text.
export const questions: Question[] = [
  {
    _id: '1',
    title: 'How to learn React?',
    description: 'I want to learn React, can anyone help me?',
    tags: [
      { _id: '1', name: 'React' },
      { _id: '2', name: 'Javascript' },
    ],
    author: {
      _id: '1',
      name: 'Duy Anh',
      image:
        'https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg',
    },
    upvotes: 10,
    answers: 5,
    views: 1000,
    createdAt: new Date('2025-10-01T08:00:00Z'),
  },
  {
    _id: '2',
    title: 'Best practices for Node.js error handling?',
    description:
      'What are some recommended ways to handle errors effectively in a Node.js application?',
    tags: [
      { _id: '3', name: 'C++' },
      { _id: '4', name: 'C' },
      { _id: '5', name: 'Node' },
    ],
    author: {
      _id: '2',
      name: 'Linh Chi',
      image:
        'https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg',
    },
    upvotes: 10,
    answers: 5,
    views: 1000,
    createdAt: new Date('2025-09-15T08:00:00Z'),
  },
]
