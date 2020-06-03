import { map } from 'lodash';

export function encodeUri(params: { [key: string]: string }): string {
  const searchParams = map(
    params,
    (param: string, key) => `${encodeURIComponent(key)}=${encodeURIComponent(param)}`,
  ).join('&');
  return `?${searchParams}`;
}

export function decodeUri(uri: string) {
  const urlSearch = new URLSearchParams(uri);
  const urlSearchParams: { [key: string]: string } = {};
  // eslint-disable-next-line
  for (const param of urlSearch.entries()) {
    const [key, value] = param;
    urlSearchParams[key] = value;
  }
  return urlSearchParams;
}
