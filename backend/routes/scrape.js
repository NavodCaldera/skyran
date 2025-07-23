const express = require('express');
const { scrape } = require('../utils/saving');

const router = express.Router();

router.get('/scrape', async (req, res)=>{
    scrape();
});

module.exports = router;