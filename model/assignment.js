let mongoose = require('mongoose');
const {Aggregate} = require("mongoose");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: Number,
    date: Date,
    name: String,
    isDone: Boolean
});

AssignmentSchema.plugin(mongooseAggregatePaginate)

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
