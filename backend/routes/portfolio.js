const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const { get_risk_rate } = require('../utils/risk_cal')
const { riskCalShema } = require('../validators/portfolio')

const router = express.Router();

router.get('/risk_rate', ensureAuthenticated, (req, res) => {
    const { error, value } = riskCalShema.validate(req.body);

    if (error) {
        console.log('Validation error:', error.details);
        return res.status(400).json({ error: error.details });
    } else {
        console.log('Validation successful. Validated value:', value);
    }

    const { age, income, expenses , dependents } = value;

    console.log('Extracted values - age:', age, ', income:', income, ', expenses:', expenses, ', dependents:', dependents);

    // Assuming get_risk_rate is a synchronous function
    risk_rate = get_risk_rate(age, income, expenses, dependents);

    console.log('Calculated risk rate:', risk_rate);

    res.json({'risk_rate': risk_rate});
    console.log('Sent JSON response:', {'risk_rate': risk_rate});

});

module.exports = router;
