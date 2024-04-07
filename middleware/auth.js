const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");


exports.isAuthenticated = async (req, res, next) => {
    // استخراج التوكن من رأس الطلب
    const token = req.headers.authorization;

    // التحقق من وجود التوكن
    if (!token || !token.startsWith('Bearer')) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
        // استخراج الجزء الثاني من التوكن بعد "Bearer "
        const tokenString = token.split(' ')[1];

        // تحقق من صحة التوكن
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();

    } catch (error) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
}


//middleware for admin
exports.isAdmin = (req, res, next) => {
    if (req.user.role === 0) {
        return next(new ErrorResponse('Access denied, you must an admin', 401));
    }
    next();
}