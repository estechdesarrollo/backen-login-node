import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    user: {
        type:       String,
        maxlength:  50,
        unique:     true,
        required:   true
    },
    password: {
        type:       String,
        maxlength:  70,
        unique:     true,
        required:   true
    },
    state: {
        type: Number,
        default: 1
    }
});

const user = mongoose.model('user', userSchema);// convertir en modelo  user y almacenar en objeto
export default user;