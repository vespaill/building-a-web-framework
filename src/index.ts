import { User } from "./models/User";

const user = User.buildUser({ id: 1, name: "tom" });

user.on("save", () => {
    console.log(user);
});

user.save();
