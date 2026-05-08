export const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: `lax`,
    maxAge: process.env.NODE_ENV === 'production' ? 24 * 60 * 60 * 1000 : 1000 * 60 * 60
}