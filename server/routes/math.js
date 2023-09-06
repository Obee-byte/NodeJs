const express = require('express')
const router = express.Router()


router.get('/:id/:var/:iter', async (req, res) => {
    try {
      const id = req.params.id;
      const diff = req.params.var;
      const iter = req.params.iter;
      const combinedData = [id, diff, iter];
      res.render('math', { combinedData });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
});
  
module.exports = {router};
