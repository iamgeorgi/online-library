import passport from 'passport';

const authMiddleware = passport.authenticate('jwt', { session: false });

// const roleMiddleware = roleName => {
//     return (req, res, next) => {
//         if (req.user && req.user.role === roleName) {
//             next();
//         } else {
//             res.status(403).json({ message: 'Resouce is forbidden!'});
//         }
//     };
// };

export {
    authMiddleware,
    // roleMiddleware
};
