const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const bcrypt = require('bcryptjs');
let usersSchema = new Schema({

    methods: {
        type: [String],
        // enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String,
            lowercase:true
        },
        password: {
            type: String,
        },
    },
    google: {
        id: {
            type: String
        },
        email: {
            type : String,
            lowercase : true
        },
        name: {
            type : String,
        }
    },
    facebook: {

    }
    
});

// usersSchema.pre('save', function (next){
//     // console.log(this);
//     if(!this.methods.includes('local')){
//         console.log(this.method);
//         next();
//     } else{         
//         bcrypt.genSalt(10).then((salt) => {
//             bcrypt.hash(this.local.password, salt)
//             .then((passhash) => {
//                 this.local.password = passhash;
//                 next();
//             }).catch( (err)=>{
//                 console.log(err);
//             })
//         })
//     }
    
// });




usersSchema.methods.isValidPassword = async function(npass){
    return bcrypt.compare(npass, this.local.password).then((res)=>{
        console.log(res);
        return res;
    });
}


module.exports = mongoose.model('users', usersSchema);
  