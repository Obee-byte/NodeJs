const express = require('express')
const router = express.Router()


router.get('/:id/:var', async (req, res) => {
    try {
      const id = req.params.id;
      const diff = req.params.var;
      const combinedData = [id, diff];
      res.render('spreme', { combinedData });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
});
  
module.exports = {router};
