
  const authorization = (permission) => {
  return async (req, res, next) => {
    const user = req.user;

    if (!user.isAdmin && !user.role.permissions.includes(permission)) {
      return res.status(401).send({ message: "You are not authorized to see this. Contact Supervisor" });
    }
    next();
  };
};

export default authorization;
