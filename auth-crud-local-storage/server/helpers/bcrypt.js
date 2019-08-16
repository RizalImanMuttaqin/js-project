const bcrypt = require('bcryptjs');

module.exports = {
    hashingPassword : async function (password){
        console.log("bcrit", password);
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        return passwordHash;        
    }
}

