var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// post model
var postSchema = new mongoose.Schema({

	// no need to validate username,
	// since it is already verified during the registration.
	// And all usernames are unique.
	username: 	{
					type: String
				},
	post: 	{
				type: String,
				required: [true, "Please write something before you add a post!"],
				minlength: [21, "Your post is too short! Please write more than 20 characters!"],
				maxlength: [799, "Your post is too long! Please write less than 800 characters!"],
				validate: {
					validator: function(post) {
						return /^\s*$/.test(post);
					},
					message: "Your post cannot be blanks! Just spaces will not work!"
				}
			},
	// post can have many comments. (one-to-many relationship)
	_comments: 	[{	type: Schema.Types.ObjectId, ref: 'Comment'	}]
}, { timestamps: true });

// comment model
var commentSchema = new mongoose.Schema({
	_post: {type: Schema.Types.ObjectId, ref: 'Post'},
	username: 	{
					type: String
				},
	comment: {
				type: String,
				required: [true, "Please write something before you add a comment!"],
				minlength: [9, "Your comment is too short! Please write more than 8 characters!"],
				maxlength: [499, "Your comment is too long! Please write less than 500 characters!"],
				validate: {
					validator: function(post) {
						return /^\s*$/.test(post);
					},
					message: "Your comment cannot be blanks! Just spaces will not work!"
				}
			}
}, {timestamps: true});

mongoose.model('Post', postSchema);
mongoose.model('Comment', commentSchema);
