export function getURL(os: string, version: string): string {
  const ext = (os: string) => {
    if (os === 'pc-windows-msvc') {
      return 'zip';
    } else {
      return 'tar.gz';
    }
  };

  const mdbookSitemapGeneratorName: string = `mdbook-sitemap-generator-x86_64-${os}`;
  const baseURL: string =
    'https://github.com/rxdn/mdbook-sitemap-generator/releases/download';
  const url: string = `${baseURL}/v${version}/${mdbookSitemapGeneratorName}.${ext(os)}`;

  return url;
}
