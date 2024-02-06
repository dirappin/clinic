import { atom } from "recoil";

const user = atom({
    key: "user-atom",
    default: {
        firstName: "",
        secondName: "",
        email: "",
        phoneNumber: "",
        authToken: "",
        profileImageUrl: "",
        loggedIn: false,
        role: "",
    },
});

export default user;
