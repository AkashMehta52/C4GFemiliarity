import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

//create a schema for storing in MongoDB
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    picture: {
        type: String,
        default: "https://img.icons8.com/emoji/48/000000/girl-medium-dark-skin-tone.png",
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String, 
        required: true
    },
    mentor: {
        type: String,
    },
    mentee: {
        type: String,
    },
    moodBoard: [{ day: Date, moodValue: Number, journalEntry: String, privateEntry: Boolean }]
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){ next(); }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('user', userSchema);

export default User;