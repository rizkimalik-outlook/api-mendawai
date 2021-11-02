import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const auth = async function (req, res) {
    return new Promise((resolve, reject) => {
        const { authorization } = req.headers;
        if (!authorization) return res.status(401).end('Unauthorized');

        const authSplit = authorization.split(' ')
        const [authType, authToken] = [
            authSplit[0],
            authSplit[1]
        ]

        if (authType !== 'Bearer') return res.status(401).end();

        return jwt.verify(authToken, process.env.JWT_SECRET, function (err, decode) {
            if (err) return res.status(401).end();

            return resolve(decode);
        })

        /* try {
            const decoded = jwt.verify(token, config.TOKEN_KEY);
            req.user = decoded;
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        return next(); */

    });
}

export default auth;

