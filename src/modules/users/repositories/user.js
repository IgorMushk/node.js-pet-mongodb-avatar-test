const User = require('../modals/user');

class UsersRepository {
    async create(payload) {
        const user = await User.create(payload);
        return user;
    }

    async findByEmail(email) {
        const users = await User.find().where('email').equals(email);
    
        return users[0];
      }

    async findById(id) {
        const user = await User.findById(id);
    
        return user;
    }
    
    async updateById(id, payload) {
        //const user = await User.findByIdAndUpdate(id, payload);
        const user = await User.findByIdAndUpdate(id, payload, {returnOriginal: false,});
        return user;
    }
    
    async findUserByRefreshToken(token) {
       const users = await User.find().where('refreshToken').equals(token);
    
       return users[0];
    }  

}

const usersRepository = new UsersRepository();

module.exports = usersRepository;
