import Url from '../models/url.model.js'
import { generateShortUrl } from '../utils/shorturl.utils.js'

export const saveUrl = async (url, userId) => {
    if (!url) {
        return null
    }
    const shortUrl = generateShortUrl()
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const newUrl = new Url({ shortUrl, longUrl: url, expiry, userId })

    await newUrl.save()
    return shortUrl
}

export const getLongUrl = async (shortUrl, click = false) => {
    // const url = await Url.findOne({ shortUrl })
    // if (!url) {
    //     return null
    // }
    // if (click) {
    //     url.clicks += 1
    //     await url.save()
    // }
    // let url
    if (click) {
        const url = await Url.findOneAndUpdate({ shortUrl }, { $inc: { clicks: 1 } }, { new: true })
        if (url) return url
    }
    else {
        const url = await Url.findOne({ shortUrl })
        if (url) return url
    }
    if (!url) {
        return null
    }

}


export const findUrlsByUserId = async (userId) => {
    return await Url.find({ userId })
}