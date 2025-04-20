// Mock quiz data for demonstration purposes

export interface MockQuiz {
  id: string;
  title: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  points: number;
  timeLimit: number; // in minutes
  questionsCount: number;
  questions: MockQuizQuestion[];
}

export interface MockQuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const mockQuizzes: MockQuiz[] = [
  {
    id: 'react-hooks',
    title: 'React Hooks Mastery',
    topic: 'React',
    difficulty: 'Intermediate',
    points: 100,
    timeLimit: 15,
    questionsCount: 3,
    questions: [
      {
        id: 'q1',
        text: 'What is the purpose of React\'s useEffect hook?',
        options: [
          'To handle side effects in functional components',
          'To create new React components',
          'To style React components',
          'To manage routing in React'
        ],
        correctAnswer: 0,
        explanation: 'useEffect is used for handling side effects like data fetching, subscriptions, or DOM manipulations.'
      },
      {
        id: 'q2',
        text: 'When does useEffect run?',
        options: [
          'Only on component mount',
          'After every render',
          'Only when dependencies change',
          'Before component unmount'
        ],
        correctAnswer: 1,
        explanation: 'By default, useEffect runs after every render unless dependencies are specified.'
      },
      {
        id: 'q3',
        text: 'What is the cleanup function in useEffect?',
        options: [
          'A function to clean component memory',
          'A function that runs before the effect',
          'A function to remove event listeners',
          'A function that runs before unmount or re-render'
        ],
        correctAnswer: 3,
        explanation: 'The cleanup function runs before the component unmounts and before re-running the effect.'
      }
    ]
  },
  {
    id: 'typescript-basics',
    title: 'TypeScript Fundamentals',
    topic: 'TypeScript',
    difficulty: 'Beginner',
    points: 80,
    timeLimit: 10,
    questionsCount: 3,
    questions: [
      {
        id: 'q1',
        text: 'What is the purpose of TypeScript interfaces?',
        options: [
          'To define CSS styles',
          'To create type contracts for objects',
          'To handle HTTP requests',
          'To manage state'
        ],
        correctAnswer: 1,
        explanation: 'Interfaces in TypeScript define contracts in your code and provide explicit names for type checking.'
      },
      {
        id: 'q2',
        text: 'What is the difference between type and interface in TypeScript?',
        options: [
          'Types are faster than interfaces',
          'Interfaces can only be used with classes',
          'Types can\'t be extended',
          'Interfaces can be merged, types cannot'
        ],
        correctAnswer: 3,
        explanation: 'A key difference is that interfaces can be merged through declaration merging while types cannot.'
      },
      {
        id: 'q3',
        text: 'What is the "any" type in TypeScript?',
        options: [
          'A type that can hold any value',
          'A type for numbers only',
          'A type for strings only',
          'A type for arrays'
        ],
        correctAnswer: 0,
        explanation: 'The "any" type is used when you want to opt-out of type checking for a variable.'
      }
    ]
  },
  {
    id: 'nextjs-routing',
    title: 'Next.js Routing Quiz',
    topic: 'Next.js',
    difficulty: 'Advanced',
    points: 120,
    timeLimit: 20,
    questionsCount: 3,
    questions: [
      {
        id: 'q1',
        text: 'What is the purpose of dynamic routes in Next.js?',
        options: [
          'To create animated transitions',
          'To handle variable paths in URLs',
          'To optimize images',
          'To manage state'
        ],
        correctAnswer: 1,
        explanation: 'Dynamic routes allow you to create pages that can handle dynamic data in the URL path.'
      },
      {
        id: 'q2',
        text: 'What is the correct file naming convention for dynamic routes?',
        options: [
          '[param].js',
          '{param}.js',
          '<param>.js',
          'param.dynamic.js'
        ],
        correctAnswer: 0,
        explanation: 'Next.js uses square brackets [] in file names to create dynamic routes.'
      },
      {
        id: 'q3',
        text: 'What is the purpose of getStaticPaths in Next.js?',
        options: [
          'To style components',
          'To define API routes',
          'To specify dynamic routes for static generation',
          'To handle client-side routing'
        ],
        correctAnswer: 2,
        explanation: 'getStaticPaths specifies which dynamic routes should be pre-rendered at build time.'
      }
    ]
  }
];