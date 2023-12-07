type HeadersT = Record<string, string>
const headers: HeadersT = {}

export function setHeaders(additionalHeaders: HeadersT) {
  Object.assign(headers, additionalHeaders)
}

export function getHeaders(): HeadersT {
  return headers
}
