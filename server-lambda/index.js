const Twit = require('twit')

exports.handler = async (event) => {

  const response = {
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials": "true"
    },
    statusCode: null,
    body: null,
  }

  const body = JSON.parse(event.body) || {}
  const {
    access_token: accessToken,
    access_token_secret: accessTokenSecret,
    text,
    image
  } = body

  if (!accessToken || !accessTokenSecret || !text || !image) {
    response.statusCode = 400
    response.body = JSON.stringify({ success: 0, error: 'required' })
    return response
  }

  try {
    const client = new Twit({
        consumer_key:         '',
        consumer_secret:      '',
        access_token:         accessToken,
        access_token_secret:  accessTokenSecret,
        timeout_ms:           60 * 1 * 1000, // 1min
        strictSSL:            true,
    })

    const { err, data } = await client.post('media/upload', { media_data: image })
    if (err) {
      throw new Error('Failed to post media/upload')
    }

    const mediaIdStr = data.media_id_string
    const metaParams = { media_id: mediaIdStr, alt_text: { text } }

    const { err: errMediaMeta } = await client.post('media/metadata/create', metaParams)
    if (errMediaMeta) {
      throw new Error('Failed to post media/metadata/create')
    }

    const params = { status: text, media_ids: [ mediaIdStr ] }

    const { err: errStateUpdate } = await client.post('statuses/update', params)
    if (errStateUpdate) {
      throw new Error('Failed to post statuses/update')
    }

    response.statusCode = 200
    response.body = JSON.stringify({ success: 1 })
    return response

  } catch (e) {
    console.log(e)
    response.statusCode = 400
    response.body = JSON.stringify({ success: 0, error: e })
    return response
  }
};
