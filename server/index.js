const express = require('express')
const cors = require('cors')
const Twit = require('twit')

const app = express()

const corsOptions = {
  origin: '*',
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/upload', async (req, res) => {

  const body = req.body || {}

  const {
    access_token: accessToken,
    access_token_secret: accessTokenSecret,
    text,
    image
  } = body

  if (!accessToken || !accessTokenSecret || !text || !image) {
    return res.status(400).json({ success: 0, error: 'required' })
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

    return res.status(200).json({success: 1})

  } catch (e) {
    console.log(e)
    return res.status(400).json({ success: 0 })
  }
})

app.listen(3290, () => {
  console.log('Server app listening on port 3290!')
})