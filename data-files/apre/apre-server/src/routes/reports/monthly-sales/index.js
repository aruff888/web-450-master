/**
 * Week 2 Major Task M-064 - Monthly Sales Report
 * Creates an API endpoint that returns sales totals by month.
 */

'use strict';

const express = require('express');
const { mongo } = require('../../../utils/mongo');

const router = express.Router();

/**
 * GET /months
 * Returns total sales grouped by month.
 */
router.get('/months', (req, res, next) => {
  try {
    mongo(async (db) => {
      const monthlySales = await db.collection('sales').aggregate([
        {
          $group: {
            _id: '$month',
            totalSales: { $sum: '$amount' }
          }
        },
        {
          $project: {
            _id: 0,
            month: '$_id',
            totalSales: 1
          }
        },
        {
          $sort: { month: 1 }
        }
      ]).toArray();

      res.send(monthlySales);
    }, next);
  } catch (err) {
    console.error('Error getting monthly sales:', err);
    next(err);
  }
});

module.exports = router;