const { Comment } = require('../models');

const commentData = [
  {
    comment_body: "mySQL is so convenient! I love using sequelize with mySQL to create full stack applications easily!",
    post_id: 1,
    user_id: 3
  },
  {
    comment_body: "Can you tell me more about mySQL syntax?",
    post_id: 1,
    user_id: 4
  },
  {
    comment_body: "mySQL syntax is super easy to learn! Check out the documentation here: https://www.npmjs.com/package/mysql2",
    post_id: 1,
    user_id: 1
  },
  {
    comment_body: "Don't you find it difficult to build and integrate databases while also focusing on stellar front-end applications?",
    post_id: 2,
    user_id: 5
  },
  {
    comment_body: "Bootstrap has a lot more to it but the documentation can be really confusing",
    post_id: 3,
    user_id: 1
  },
  {
    comment_body: "Normalize is great for simple applications, but doesn't have a ton of options!",
    post_id: 3,
    user_id: 4
  },
  {
    comment_body: "Javascript is my nemesis. I am not a fan.",
    post_id: 4,
    user_id: 2
  },
  {
    comment_body: "It's not the easiest language, but it's the basis for so many others!",
    post_id: 4,
    user_id: 3
  },
  {
    comment_body: "How do you implement hashing? I'm not familiar with this term.",
    post_id: 5,
    user_id: 1
  },
  {
    comment_body: "this just makes me think mistakes are being made...'oh crud!'",
    post_id: 6,
    user_id: 3
  },
  {
    comment_body: "i don't get this",
    post_id: 7,
    user_id: 2
  },
  {
    comment_body: "I wish more people wrote their API documentation in layman's terms",
    post_id: 8,
    user_id: 1
  },
  {
    comment_body: "do you work for a company or just freelance?",
    post_id: 9,
    user_id: 5
  },
  {
    comment_body: "I work for a startup company so the work is all remote and pretty flexible!",
    post_id: 9,
    user_id: 4
  },
  {
    comment_body: "front end work is so much easier than back-end work",
    post_id: 10,
    user_id: 4
  },
  {
    comment_body: "I actually find back-end a lot easier than front-end. Teh sytnax is mere developed.",
    post_id: 10,
    user_id: 4
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;