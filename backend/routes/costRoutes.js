const express = require('express');
const router = express.Router();
const CostEVM = require('../models/CostEVM');

// EVM data save aur automatic calculations ka API
router.post('/calculate-evm', async (req, res) => {
    try {
        const { plannedValuePV, earnedValueEV, actualCostAC, approvedBudget } = req.body;

        // Formalon ke mutabiq CPI aur SPI calculate karna
        const cpi = actualCostAC > 0 ? (earnedValueEV / actualCostAC) : 0;
        const spi = plannedValuePV > 0 ? (earnedValueEV / plannedValuePV) : 0;

        // Warnings check karna
        let warnings = [];
        if (cpi < 1) {
            warnings.push("WARNING: Cost Overrun detected! CPI is less than 1 (Project is over budget).");
        }
        if (spi < 1) {
            warnings.push("WARNING: Schedule Delay detected! SPI is less than 1 (Project is behind schedule).");
        }

        const newEVM = new CostEVM({
            plannedValuePV,
            earnedValueEV,
            actualCostAC,
            approvedBudget
        });

        const savedEVM = await newEVM.save();

        res.status(201).json({
            message: "Earned Value Analysis calculated successfully!",
            metrics: {
                PV: plannedValuePV,
                EV: earnedValueEV,
                AC: actualCostAC,
                CPI: cpi.toFixed(2),
                SPI: spi.toFixed(2)
            },
            warnings,
            savedEVM
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;