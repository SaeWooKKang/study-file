const mongoose = require('mongoose');
const Post = require('./schemas/post')

// Post 컬렉션에 Post 스키마 사용한다.
// model에 컬렉션과 스키마 등록
exports.Post = mongoose.model('Post', Post);

