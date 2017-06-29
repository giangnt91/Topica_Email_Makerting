var mongoose = require('mongoose');

// connect to mongodb and create/use database
mongoose.connect('mongodb://localhost:27017/MailBox');
// mongoose.connect('mongodb://192.168.99.100:52025/MailBox');

// create db
var MailSchema = new mongoose.Schema({
    file_Id: String,
    mail_Auth: String,
    mail_To: Array,
    mail_Title: String,
    mail_Content: String,
    File: Array,
    create_Time: String,
    Status: Boolean,
    Delete: Boolean
},{
    versionKey: false
});

// create a model based on the schema
module.exports = mongoose.model('Mail', MailSchema);
