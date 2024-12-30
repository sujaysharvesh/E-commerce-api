import StatusCode from "http-status-codes"

export const notFound = (req, res, next) => {
    res.status(StatusCode.NOT_FOUND).send("Router doesn't exist")
}