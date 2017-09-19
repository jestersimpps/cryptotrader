import 'mocha';
import { expect } from 'chai';
import * as request from 'supertest';

import app from '../../src/index';

describe('/', () => {
  describe('GET', () => {
    it('should return API information', done => {
      request(app)
        .get('/')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
