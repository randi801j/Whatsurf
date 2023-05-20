const Break = require('../models/breakModel');

module.exports = {
    findAllBreaks: (req, res) => {
        Break.find()
            .then((allBreaks) => {
                res.status(200).json(allBreaks)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },
    createBreak: (req, res) => {
        Break.create(req.body)
            .then((newBreak) => {
                res.status(200).json(newBreak)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },
    findOneBreak: (req, res) => {
        Break.findOne({_id: req.params.id})
            .then((oneBreak) => {
                res.status(200).json(oneBreak)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    },
    updateBreak: (req, res) => {
        Break.findOneAndUpdate(        
            {_id: req.params.id}, 
            req.body, 
            {new:true, runValidators:true})
            .then((updatedBreak) => {
                res.status(200).json(updatedBreak)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    }, 
    deleteBreak: (req, res) => {
        Break.deleteOne({_id: req.params.id})
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    }
}