/**
 * Week 2 Major Task M-064
 * Unit tests for the Monthly Sales Report API endpoint.
 */

const request = require('supertest');
const app = require('../../../../src/app');
const { mongo } = require('../../../../src/utils/mongo');

jest.mock('../../../../src/utils/mongo');

describe('Apre Monthly Sales Report API', () => {
  beforeEach(() => {
    mongo.mockClear();
  });

  it('should fetch monthly sales totals', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            { month: 'January', totalSales: 1500 },
            { month: 'February', totalSales: 2000 }
          ])
        })
      };

      await callback(db);
    });

    const response = await request(app).get('/api/reports/monthly-sales/months');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { month: 'January', totalSales: 1500 },
      { month: 'February', totalSales: 2000 }
    ]);
  });

  it('should return an empty array when no monthly sales are found', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([])
        })
      };

      await callback(db);
    });

    const response = await request(app).get('/api/reports/monthly-sales/months');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return 404 for an invalid monthly sales endpoint', async () => {
    const response = await request(app).get('/api/reports/monthly-sales/invalid-endpoint');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Not Found',
      status: 404,
      type: 'error'
    });
  });
});