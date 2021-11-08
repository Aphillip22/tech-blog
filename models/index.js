// require necessary models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// define associations
//user can have many posts associated with user_id
User.hasMany(Post, {
    foreignKey: 'user_id'
});
//post must belong to singular user_id (many to one relationship)
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//comment belongs to singular user_id and deletes on cascade using hooks
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true
});

//comment belongs to singular post_id and deletes on cascade using hooks
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks: true
});

//user can have many comments associated with user_id
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true
});

//posts can have many comments associated with post_id
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade',
    hooks:true
})

// Export module associations
module.exports = { User, Post, Comment };