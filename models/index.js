const User = require('./User');
const Post = require('./Post')
const Comment = require('./Comment')

User.hasMany(Post, {
  foreignKey: 'posted_by_user_id',
  constraints: false
});

Post.belongsTo(User, {
  foreignKey: 'posted_by_user_id',
  constraints: false
});

Post.hasMany(Comment, {
  foreignKey: 'on_post_id',
  constraints: false
});

Comment.belongsTo(Post, {
  foreignKey: 'on_post_id',
  constraints: false
});

User.hasMany(Comment, {
  foreignKey: 'comment_by_user_id',
  constraints: false
})

Comment.belongsTo(User, {
  foreignKey: 'comment_by_user_id',
  constraints: false
})

module.exports = { User, Post, Comment };
