export const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}

// export const asyncWrapper = (fn) => (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch(next)
// }