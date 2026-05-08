import Url from '../models/url.model.js'
import { generateShortUrl } from '../utils/shorturl.utils.js'

export const saveUrl = async (url) => {
    if (!url) {
        return null
    }
    const shortUrl = generateShortUrl()
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const newUrl = new Url({ shortUrl, longUrl: url, expiry })
    await newUrl.save()
    return shortUrl
}

export const getLongUrl = async (shortUrl) => {
    const url = await Url.findOne({ shortUrl })

    console.log('from services: ');
    console.log(url);
    return url
}