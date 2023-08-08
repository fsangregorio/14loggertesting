
import { Command } from "commander";
import UserManager from "../../domain/managers/userManager";

const AddUserCommand = new Command("add-user");

AddUserCommand.version("1.0.0")
  .description("Add a new user")
  .option("-e, --email <email>", "User eMail")
  .option("-p, --password <password>", "User password")
  .option("-fn, --firstname <firstname>", "User firstName")
  .option("-ln, --lastname <lastname>", "User lastName")
  .option("-a, --age <age>", "User age")
  .option("-ia, --isAdmin <isAdmin>", "User isAdmin")
  .action(async (options) => {
    const payload = {
      ...options,
      age: +options.age,
      isAdmin: options.isAdmin === "true",
    };
    const manager = new UserManager();
    const user = await manager.createUser(payload);

    if (user) {
      console.log("User created");
    }
  });
