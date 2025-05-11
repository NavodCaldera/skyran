const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const { get_risk_rate } = require('../utils/risk_cal')
const { riskCalShema } = require('../validators/portfolio')

const router = express.Router();

router.get('/risk_rate', ensureAuthenticated, (req, res) => {
    const { error, value } = riskCalShema.validate(req.body);
    const { age, income, expenses , dependents } = value;

    risk_rate = get_risk_rate(age, income, expenses, dependents);

    res.json({'risk_rate': risk_rate})
});

module.exports = router;
