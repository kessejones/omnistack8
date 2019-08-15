const Dev = require('../models/Dev');

module.exports = {
    async store(req, res){
        const { id } = req.params;
        const { user: userId } = req.headers;

        const loggedDev = await Dev.findById(userId);
        const targetDev = await Dev.findById(id);

        if(!targetDev) {
            return res.status(400).json({
                error: 'Dev not found!'
            });
        }

        if(targetDev.likes.includes(loggedDev._id)) {
            console.log('Deu Match!');
        }

        loggedDev.dislikes.push(targetDev._id);
        
        await loggedDev.save();

        return res.json(loggedDev);
    }
}