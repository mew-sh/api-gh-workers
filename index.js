export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    url.hostname = 'api.github.com'
    url.protocol = 'https:'
    url.port = '443'

    const newHeaders = new Headers(request.headers)
    for (const key of newHeaders.keys()) {
      const k = key.toLowerCase()
      if (k.startsWith('cf-') || k.startsWith('x-forwarded-') || k.startsWith('x-real-')) {
        newHeaders.delete(key)
      }
    }

    const proxyRequest = new Request(url.toString(), {
      method: request.method,
      headers: newHeaders,
      body: request.body,
      redirect: 'manual',
    })

    return fetch(proxyRequest)
  },
}
