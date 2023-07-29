const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handled GET request to /products! 💩"
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Handled POST request to /products! ♥"
    })
})

router.get('/:id', (req, res, next) =>{
    const { id } = req.params
    if (id === 'special') {
        res.status(200).json({
            message: "You discover the secret ID! 😎🔥",
            id: id
        })
    } else {res.status(200).json({
        message:"You passed the ID"
    })}
})

module.exports = router