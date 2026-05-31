import Url from "../models/url.model.js";
import { getLongUrl, saveUrl } from "../services/url.service.js";
import { generateShortUrl } from "../utils/shorturl.utils.js";

export const createShortUrl = async (req, res) => {
    const { url } = req.body || {};
    const user = req.user;
    if (!url) {
        return res.status(400).send({
            success: false,
            message: "Long URL is required",
        });
    }

    const shortUrl = await saveUrl(url, user._id);

    const BASE_URL = process.env.DOMAIN;
    return res.status(201).send({
        success: true,
        message: "Short URL created successfully",
        data: {
            shortUrl: BASE_URL + shortUrl,
        },
    });
};

export const redirect = async (req, res) => {
    console.log("hello");
    const shortUrl = req.params.shortUrl;
    const { longUrl } = await getLongUrl(shortUrl, true);
    console.log(shortUrl, longUrl);

    if (!longUrl) {
        console.log('route not found');
        return res.status(404).send({
            success: false,
            message: "Short URL not found",
        });
        // console.log('surl not found');
    }
    res.redirect(longUrl);
};


export const getUserUrls = async (req, res) => {
    const user = req.user;
    const urls = await Url.find({ userId: user._id });
    return res.status(200).send({
        success: true,
        message: "User URLs fetched successfully",
        data: urls,
    });
}