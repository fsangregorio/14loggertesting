
import UserManager from "../../domain/managers/userManager.js";

const getUsers = async (req, res, next) => {
  try {
    const manager = new UserManager();
    const users = await manager.getUsers(req.query);
    return res.status(200).json({
      status: "Success",
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const manager = new UserManager();
    const user = await manager.getUserById(req.params.id);
    return res.status(200).json({
      status: "Success",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const manager = new UserManager();
    const user = await manager.createUser(req.body);
    return res.status(201).json({
      status: "Success",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const manager = new UserManager();
    const user = await manager.updateUser(req.params.id, req.body);
    return res.status(200).json({
      status: "Success",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const manager = new UserManager();
    await manager.deleteUser(req.params.id);
    return res.status(200).json({
      status: "Success",
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export { getUsers, getUserById, createUser, updateUser, deleteUser };
