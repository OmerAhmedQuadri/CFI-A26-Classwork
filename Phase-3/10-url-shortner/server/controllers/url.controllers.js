import Url from "../models/url.model.js";
import { findUrlsByUserId, getLongUrl, saveUrl } from "../services/url.service.js";
import { BadRequestError } from "../utils/AppError.js";
import { asyncWrapper } from "../utils/asyncHandler.js";
import { generateShortUrl } from "../utils/shorturl.utils.js";

export const createShortUrl = asyncWrapper(async (req, res, next) => {
    const { url } = req.body || {};
    const user = req.user;
    if (!url) {
        throw new BadRequestError('URL is required')
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
})

export const redirect = asyncWrapper(async (req, res, next) => {
    console.log("hello");
    const shortUrl = req.params.shortUrl;
    const { longUrl } = await getLongUrl(shortUrl, true);
    console.log(shortUrl, longUrl);

    if (!longUrl) {
        throw new BadRequestError('Short URL not found');
    }
    res.redirect(longUrl);
});


export const getUserUrls = asyncWrapper(async (req, res, next) => {
    const user = req.user;
    const urls = await findUrlsByUserId(user._id);
    return res.status(200).send({
        success: true,
        message: "User URLs fetched successfully",
        data: urls,
    });
});