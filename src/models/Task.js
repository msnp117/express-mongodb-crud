import {Schema, model} from 'mongoose';

const taskSchema = new Schema({
    title: {
        type: String,
        required: true, //lanza un error si no se esdcribe
        unique: true, //lanza un error si se repite con otro titula
        trim: true //elimina los espacios demas delante y detrAS
    },
    description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true, //v
    // createdAt    updatedAt
    versionKey: false
})



export default model('Task', taskSchema)