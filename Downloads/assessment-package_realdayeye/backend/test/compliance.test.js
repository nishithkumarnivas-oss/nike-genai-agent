const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('Compliance API', () => {
  it('POST /api/compliance/extract-texas-requirements returns mock extraction', async () => {
    const res = await request(app)
      .post('/api/compliance/extract-texas-requirements')
      .field('foo', 'bar');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message');
  });
});
