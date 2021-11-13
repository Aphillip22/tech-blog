const { Post } = require('../models');

const postData = [
  {
    user_id: 1,
    title: 'mySQL',
    post_body: 'MySQL is an open-source relational database management system (RDBMS). Its name is a combination of My, the name of co-founder Michael Widenius daughter, and SQL, the abbreviation for Structured Query Language.', 
  },
  {
    title: 'Creating Databases',
    post_body: 'Using SQL you can create your own databases easily to support your front-end application with robust back-end data.',
    user_id: 1,
  },
  {
    title: 'Bootstrap vs Normalize',
    post_body: 'Bootstrap CSS provides a much wider variety of CSS functionality while Normalize has simple and easy to implement documentation.',
    user_id: 2,
  },
  {
    title: 'What is Javascript?',
    post_body: 'Javascript is an object-oriented computer programming language commonly used to create interactive effects within web browsers.',
    user_id: 3,
  },
  {
    title: 'Authentication',
    post_body: 'Coders can use a function known as hashing to ensure password encryption for user data safety.',
    user_id: 3,
  },
  {
    title: 'What does CRUD mean?',
    post_body: 'CRUD operations are foundation operations every database developer and administrator needs to understand. In computer programming, create, read, update, and delete (CRUD) are the four basic functions of persistent storage.',
    user_id: 4,
  },
  {
    title: 'Object-Relational-Mapping',
    post_body: '(ORM) is a programming technique in which a metadata descriptor is used to connect object code to a relational database. Object code is written in object-oriented programming (OOP) languages such as Java or C#.',
    user_id: 5,
  },
  {
    title: 'API Integration',
    post_body: 'Application Programming Interface (API), a set of functions and procedures allowing the creation of applications that access the features or data of an operating system, application, or other service.',
    user_id: 5,
  },
  {
    title: 'Working as a developer',
    post_body: 'I love my job as a full stack web developer because I get to work from home whenever I want.',
    user_id: 2,
  },
  {
    title: 'Front-end vs Back-end',
    post_body: 'Front-end developers do not make as much money as back-end developers, typically, but there are more front-end jobs available than there are back-end jobs.',
    user_id: 4,
  }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;