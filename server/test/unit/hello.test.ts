/**
 * This is just a sample of how unit tests
 * should be written.
 *
 * TODO: Remove it once we have actual tests written.
 */

import 'mocha';
import { expect } from 'chai';

const hello = () => 'Hello World!';

describe('hello()', () => {
  it('should return hello world', () => {
    const result = hello();

    expect(result).to.equal('Hello World!');
  });
});
