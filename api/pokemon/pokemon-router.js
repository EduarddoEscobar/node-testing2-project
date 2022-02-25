const {Router} = require('express');
const router = Router();
const Pokemon = require('./pokemon-model');

router.get('/', (req, res, next) => {
    Pokemon.getAll()
        .then(pokemon => {
            res.status(200).json(pokemon);
        }).catch(next);
})

router.get('/:id', (req, res, next) => {
    Pokemon.getById(req.params.id)
        .then(pokemon => {
            res.status(200).json(pokemon);
        }).catch(next);
})

router.post('/', (req, res, next) => {
    Pokemon.insert(req.pokemon)
        .then(pokemon => {
            res.status(201).json(pokemon);
        }).catch(next);
})

router.put('/:id', (req, res, next) => {
    Pokemon.update(req.params.id, req.pokemon)
        .then(pokemon => {
            res.status(200).json(pokemon);
        }).catch(next);
})

router.delete('/:id', (req, res, next) => {
    Pokemon.remove(req.params.id)
        .then(pokemon => { 
            res.status(200).json(pokemon);
        }).catch(next)
})

module.exports = router;