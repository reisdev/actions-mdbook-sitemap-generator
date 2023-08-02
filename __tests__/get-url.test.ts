import {getURL} from '../src/get-url';

describe('getURL()', () => {
  test('return extected URL', () => {
    let testVersion = "0.1.0"
    const baseURL: string = `https://github.com/rxdn/mdbook-sitemap-generator/releases/download/v${testVersion}/mdbook-sitemap-generator-x86_64`;
    const urlLinux: string = `${baseURL}-unknown-linux-gnu`;
    const urlMacOS: string = `${baseURL}-apple-darwin`;
    const urlWindows: string = `${baseURL}-pc-windows-msvc`;
    expect(getURL('unknown-linux-gnu', '0.1.0')).toBe(urlLinux);
    expect(getURL('unknown-linux-gnu', '0.2.0')).not.toBe(urlLinux);
    expect(getURL('my-os', '0.1.0')).not.toBe(urlLinux);
    expect(getURL('apple-darwin', '0.1.0')).toBe(urlMacOS);
    expect(getURL('pc-windows-msvc', '0.1.0')).toBe(urlWindows);
  });
});
