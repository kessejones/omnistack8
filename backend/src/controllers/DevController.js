const axios = require('axios');

const Dev = require('../models/Dev');

module.exports = {
    
    async index(req, res){
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } }
            ]
        });

        return res.json(users);
    },

    async store(req, res){
        const { username}  = req.body;

        const userExits = await Dev.findOne({ user: username });
        if(userExits) {
            return res.send(userExits);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { avatar_url: avatar, login: user, name, bio,} = response.data;

        const dev = await Dev.create({
            name,
            user,
            bio,
            avatar
        });

        return res.json(dev);
    }
}