var mongoose = require('mongoose');

// connect to mongodb and create/use database
mongoose.createConnection('mongodb://192.168.99.100:27017/MailBox');
// mongoose.connect('mongodb://192.168.99.100:52025/MailBox');

var Groupschema = mongoose.Schema({ 
    Name: String,
    Groups: Array,
    Total: Number,
    create_Time: String
},{
    versionKey: false
});

// create a model based on the schema
module.exports = mongoose.model('Groups', Groupschema);