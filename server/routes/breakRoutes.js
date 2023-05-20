const BreakController = require('../controllers/breakController');

module.exports = app => {
    app.get('/api/allBreaks', BreakController.findAllBreaks);
    app.post('/api/newBreak', BreakController.createBreak);
    app.get('/api/oneBreak/:id', BreakController.findOneBreak);
    app.put('/api/updateBreak/:id', BreakController.updateBreak);
    app.delete('/api/deleteBreak/:id', BreakController.deleteBreak);
}