import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

describe('Extension Test Suite', () => {
  const tempFolder = path.join(__dirname, 'temp-test-folder');
  const testFile = path.join(tempFolder, 'test.txt');

  before(() => {
    fs.mkdirSync(tempFolder, { recursive: true });
    fs.writeFileSync(testFile, 'Hello test content!');
  });

  after(() => {
    fs.rmSync(tempFolder, { recursive: true, force: true });
  });

  it('should create and read the test file correctly', () => {
    const content = fs.readFileSync(testFile, 'utf8');
    assert.strictEqual(content, 'Hello test content!');
  });
});
