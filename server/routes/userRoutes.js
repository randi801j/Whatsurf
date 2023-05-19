const userController = require('../controllers/userController');

module.exports = (app) => {
    app.post('/api/register',userController.registerUser);
    app.post('/api/login',userController.loginUser);
    app.post('/api/logout',userController.logOut);
    app.get('/api/user',userController.findAllUsers);
    app.post('/api/newUser',userController.createUser);
    app.get('/api/oneUser/:id',userController.findOneUser)
    app.put('/api/updateUser/:id',userController.updateUser);
    app.delete('/api/deleteUser/:id',userController.deleteUser);
}