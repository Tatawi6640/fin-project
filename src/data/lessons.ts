export interface Lesson {
  id: string;
  title: string;
  summary: string;
  category: 'html' | 'css' | 'javascript';
  difficulty: 'basic' | 'intermediate';
  xp: number;
  codeExample: string;
  content: string;
  completed: boolean;
}

export const lessons: Lesson[] = [
  {
    id: 'html-basics',
    title: 'HTML Fundamentals',
    summary: 'Learn the basic structure of HTML documents',
    category: 'html',
    difficulty: 'basic',
    xp: 50,
    codeExample: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is a paragraph.</p>
</body>
</html>`,
    content: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using elements and tags.',
    completed: false
  },
  {
    id: 'html-forms',
    title: 'HTML Forms',
    summary: 'Create interactive forms with HTML',
    category: 'html',
    difficulty: 'intermediate',
    xp: 75,
    codeExample: `<form>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <button type="submit">Submit</button>
</form>`,
    content: 'HTML forms are used to collect user input. They contain form elements like input fields, checkboxes, radio buttons, and submit buttons.',
    completed: false
  },
  {
    id: 'css-basics',
    title: 'CSS Fundamentals',
    summary: 'Style your web pages with CSS',
    category: 'css',
    difficulty: 'basic',
    xp: 60,
    codeExample: `h1 {
    color: #3B82F6;
    font-size: 2rem;
    text-align: center;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}`,
    content: 'CSS (Cascading Style Sheets) is used to style and layout web pages. It controls colors, fonts, spacing, and positioning of HTML elements.',
    completed: false
  },
  {
    id: 'css-flexbox',
    title: 'CSS Flexbox',
    summary: 'Master flexible layouts with Flexbox',
    category: 'css',
    difficulty: 'intermediate',
    xp: 80,
    codeExample: `.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.item {
    flex: 1;
    min-width: 200px;
}`,
    content: 'Flexbox is a powerful layout system that makes it easy to create responsive designs. It provides efficient ways to arrange, distribute, and align elements.',
    completed: false
  },
  {
    id: 'js-basics',
    title: 'JavaScript Fundamentals',
    summary: 'Learn the basics of JavaScript programming',
    category: 'javascript',
    difficulty: 'basic',
    xp: 70,
    codeExample: `// Variables
let name = "Alae";
const age = 25;
var isStudent = true;

// Functions
function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("World"));`,
    content: 'JavaScript is a programming language that adds interactivity to web pages. It can manipulate HTML elements, respond to user events, and perform calculations.',
    completed: false
  },
  {
    id: 'js-dom',
    title: 'DOM Manipulation',
    summary: 'Interact with web pages using JavaScript',
    category: 'javascript',
    difficulty: 'intermediate',
    xp: 90,
    codeExample: `// Select elements
const button = document.getElementById('myButton');
const text = document.querySelector('.text');

// Add event listener
button.addEventListener('click', function() {
    text.textContent = 'Button clicked!';
    text.style.color = 'blue';
});`,
    content: 'The DOM (Document Object Model) allows JavaScript to interact with HTML elements. You can change content, styles, and respond to user interactions.',
    completed: false
  }
];