import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    console.log('cookies', req.cookies);
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Your are not authenticated' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.userId = decoded.userId;
        next();
    });

}