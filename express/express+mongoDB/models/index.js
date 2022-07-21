const mongoose = require('mongoose');
const PostSchema = require('./schemas/post');
const UserSchema = require('./schemas/user');

// Post 컬렉션에 Post 스키마 사용한다.
// model에 컬렉션과 스키마 등록
// model을 사용해야 express에서 사용 가능 
exports.Post = mongoose.model('Post', PostSchema);

exports.User = mongoose.model('User', UserSchema);