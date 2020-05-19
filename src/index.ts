import { User } from "./models/User";

const user = new User({ name: "new record", age: 0 });

// user.set({ name: "NEW NAME", age: 9999 });
user.events.on("change", () => {
    console.log("change!");
});

user.events.trigger("change");
