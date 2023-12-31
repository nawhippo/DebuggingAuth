const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: true,
    },
    height: {
        type: Number,
        required: false,
    },
    weight: {
        type: Number,
        required: false,
    },
    resetPasswordToken: {
        type: String,
        select: false,
    },
    resetPasswordExpires: {
        type: Date,
        select: false,
    },
    twoFASecret: {
        type: String,
        select: false
    },
    twoFAEnabled: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        select: true
    },
    otpExpires: {
        type: Date,
        select: false
    },
    Subscribing: [{
        type: Schema.Types.ObjectId,
        ref: 'Professional',
    }],
    mealPlansOwned: [{
        type: Schema.Types.ObjectId,
        ref: 'Mealplan',
        select: false
    }],
    exercisePlansOwned: [{
        type: Schema.Types.ObjectId,
        ref: 'Exerciseplan',
        select: false
    }],
    currentMealPlan: {
        type: Schema.Types.ObjectId,
        ref: 'Mealplan',
        select: false,
    },
    currentExercisePlan: {
        type: Schema.Types.ObjectId,
        ref: 'ExercisePlan',
        required: false
    },
    currentSleepPlan: {
        type: Schema.Types.ObjectId,
        ref: 'Sleepplan',
        required: false
    },
    LiveSessionEnrolled: [{
        type: Schema.Types.ObjectId,
        ref: 'LiveSession',
        select: false
    }],
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);