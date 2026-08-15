export const examPrototypeData = {
  studentInfo: {
    name: 'Sarah Jenkins',
    id: 'STD-847291',
    major: 'Computer Science',
    upcomingExams: 2
  },
  upcomingExams: [
    { id: 'ex1', course: 'CS301: Data Structures', title: 'Midterm Assessment', date: 'Oct 28, 2026', duration: 120, questions: 50 },
    { id: 'ex2', course: 'ENG101: Tech Writing', title: 'Final Essay', date: 'Nov 05, 2026', duration: 90, questions: 1 }
  ],
  pastExams: [
    { id: 'px1', course: 'MATH201: Calculus II', title: 'Quiz 3', date: 'Oct 15, 2026', score: 92, status: 'Graded' },
    { id: 'px2', course: 'CS250: Computer Architecture', title: 'Midterm', date: 'Oct 10, 2026', score: 88, status: 'Graded' }
  ],
  examQuestions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      text: 'Which of the following data structures operates on a Last-In, First-Out (LIFO) principle?',
      options: ['Queue', 'Stack', 'Linked List', 'Binary Tree']
    },
    {
      id: 'q2',
      type: 'multiple-choice',
      text: 'What is the time complexity of searching for an element in a balanced binary search tree?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)']
    },
    {
      id: 'q3',
      type: 'checkbox',
      text: 'Select all the sorting algorithms that have an average time complexity of O(n log n).',
      options: ['Merge Sort', 'Bubble Sort', 'Quick Sort', 'Insertion Sort']
    },
    {
      id: 'q4',
      type: 'essay',
      text: 'Explain the difference between a process and a thread in operating systems.',
    },
    {
      id: 'q5',
      type: 'multiple-choice',
      text: 'Which keyword is used to handle exceptions in most programming languages?',
      options: ['try/catch', 'if/else', 'switch/case', 'for/while']
    }
  ],
  adminStats: {
    activeExams: 14,
    avgScore: 84.5,
    flaggedSessions: 2
  },
  liveSessions: [
    { id: 'ls1', student: 'Alex Mercer', exam: 'CS301: Midterm', status: 'Active', timeRemaining: '45:20' },
    { id: 'ls2', student: 'Elena Rostova', exam: 'CS301: Midterm', status: 'Flagged', timeRemaining: '42:15' },
    { id: 'ls3', student: 'Marcus Wright', exam: 'CS301: Midterm', status: 'Submitting', timeRemaining: '01:10' }
  ]
};
