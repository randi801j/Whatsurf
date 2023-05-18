const UserController = require ('../controllers/userController');

module.exports = (app) => {
    app.get('/api/user',UserController.findAllUsers);
    app.post('/api/newUser',UserController.createUser);
    app.get('/api/oneUser/:id',UserController.findOneUser)
    app.put('/api/updateUser/:id',UserController.updateUser);
    app.delete('/api/deleteUser/:id',UserController.deleteUser);
}