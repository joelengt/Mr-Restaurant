import request from 'request-promise'

export async function requestHTTP (uri, method, body, token) {
  try {
    var options = {
      method: method,
      uri: uri,
      body: body || {},
      json: true
    }

    let result = await request(options)
    return result

  } catch (err) {
    console.log('Error API', err)
    return err
  }
}
