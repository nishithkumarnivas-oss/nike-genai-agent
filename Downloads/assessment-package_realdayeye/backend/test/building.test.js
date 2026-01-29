const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('Building API', () => {
  it('POST /api/buildings/:buildingId/validate-texas-compliance returns a report', async () => {
    const res = await request(app)
      .post('/api/buildings/TEST_BUILDING/validate-texas-compliance')
      .send({});

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('report');
    expect(res.body.report).to.have.property('totalUnits');
  });
});
