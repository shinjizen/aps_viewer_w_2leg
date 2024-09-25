const express = require('express');
const { getTwoLeggedToken } = require('../services/aps.js');

let router = express.Router();

// Route to get 2 legged token
router.get('/api/auth/token', async (req, res) => {
    try {
        const accessToken = await getTwoLeggedToken();
        res.json(accessToken);
    } catch (e) {
        console.error('Error getting 2 legged token: ', e);
        res.status(500).send('Failed to get access token');
    }
});

module.exports = router;