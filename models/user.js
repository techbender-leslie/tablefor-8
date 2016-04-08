var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt   = require('bcryptjs');

var userSchema = new Schema({
    created: { type: Date },
    updated: { type: Date },
    email: { type: String, unique: true, lowercase: true},
    password: { type: String, select: false },
    displayName: { type: String },
    username: String,
    picture: String,
    dinners: [{ type: Schema.Types.ObjectId, ref: 'Dinner'}]
});

userSchema.pre('save', function (next) {
    now = new Date();
    this.updated = now;
    if (!this.created) {
        this.created = now;
    }

    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
};

var User = mongoose.model('User', userSchema);
module.exports = User;

