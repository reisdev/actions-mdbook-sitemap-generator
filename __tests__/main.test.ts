import * as main from '../src/main';
const nock = require('nock');
import {FetchError} from 'node-fetch';
import jsonTestBrew from './data/brew.json';
// import jsonTestGithub from './data/github.json';

jest.setTimeout(30000);
const repo: string = 'mdbook';

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  delete process.env['INPUT_MDBOOK-VERSION'];
  nock.cleanAll();
});

describe('Integration testing run()', () => {
  test('succeed in installing a custom version', async () => {
    const result: main.actionResult = await main.run();
    expect(result.output.split("\n")[0]).toMatch(`mdbook-sitemap-generator`);
  });

  test('succeed in installing the latest version', async () => {
    nock('https://formulae.brew.sh')
      .get(`/api/formula/${repo}.json`)
      .reply(200, jsonTestBrew);
    const result: main.actionResult = await main.run();
    expect(result.output.split("\n")[0]).toMatch('mdbook-sitemap-generator');
  });

  if (process.platform === 'linux') {
    test('fail to install a custom version due to 404 of tarball', async () => {
      const testVersion: string = '0.2.0';
      nock('https://github.com')
        .get(
          `/rxdn/mdbook-sitemap-generator/releases/download/v${testVersion}/mdbook-sitemap-generator-x86_64-unknown-linux-gnu`
        )
        .reply(404);
      try {
        const result: main.actionResult = await main.run();
        console.debug(result.output);
      } catch (e) {
        expect(e).toThrow(FetchError);
      }
    });
  }

  test('fail to install the latest version due to 404 of brew.sh', async () => {
    const testVersion: string = 'latest';
    nock('https://formulae.brew.sh')
      .get(`/api/formula/${repo}.json`)
      .reply(404);
    try {
      const result: main.actionResult = await main.run();
      console.debug(result.output);
    } catch (e) {
      expect(e).toThrow(FetchError);
    }
  });

  if (process.platform === 'linux') {
    test('fail to install the latest version due to 404 of tarball', async () => {
      const testVersion: string = 'latest';
      process.env['INPUT_MDBOOK-VERSION'] = testVersion;
      nock('https://formulae.brew.sh')
        .get(`/api/formula/${repo}.json`)
        .reply(200, jsonTestBrew);
      nock('https://github.com')
        .get(
          `/rxdn/mdbook-sitemap-generator/releases/download/v0.1.0/mdbook-sitemap-generator-x86_64-unknown-linux-gnu`
        )
        .reply(404);
      try {
        const result: main.actionResult = await main.run();
        console.debug(result.output);
      } catch (e) {
        expect(e).toThrow(FetchError);
      }
    });
  }
});

describe('runCommand()', () => {
  let result: main.actionResult = {
    exitcode: 0,
    output: ''
  };

  test('return version', async () => {
    result = await main.runCommand('git', ['--version']);
    expect(result.exitcode).toBe(0);
    expect(result.output).toMatch(/git version/);
  });

  test('return exception', async () => {
    try {
      result = await main.runCommand('gitgit', ['--version']);
    } catch (e) {
      expect(e).toThrow(Error);
    }
  });
});
