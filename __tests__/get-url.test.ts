import {getURL} from '../src/get-url';

describe('getURL()', () => {
  test('return extected URL', () => {
    let testVersion = "v0.1.0"
    const baseURL: string = `https://github.com/rxdn/mdbook-sitemap-generator/releases/download/${testVersion}/mdbook-sitemap-generator-x86_64`;
    const urlLinux: string = `${baseURL}-unknown-linux-gnu`;
    const urlMacOS: string = `${baseURL}-apple-darwin`;
    const urlWindows: string = `${baseURL}-pc-windows-msvc`;
    expect(getURL('unknown-linux-gnu', 'v0.1.0')).toBe(urlLinux);
    expect(getURL('unknown-linux-gnu', 'v0.2.0')).not.toBe(urlLinux);
    expect(getURL('my-os', 'v0.1.0')).not.toBe(urlLinux);
    expect(getURL('apple-darwin', 'v0.1.0')).toBe(urlMacOS);
    expect(getURL('pc-windows-msvc', 'v0.1.0')).toBe(urlWindows);
  });
});
