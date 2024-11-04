class Auth {
    constructor() {
        // mongodb connection
    }

    async registerUser(firstName, lastName, email, password) {
        const registerBody = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        }
        const registerJson = JSON.stringify(registerBody);

        const response = await fetch("", {
            method: "POST",
            body: registerJson
        });

        if (response.status == 200) {
            console.log("Success!");
            return true;
        } 
        console.log("Failed.");
    }

    async loginUser(email, password) {
        const loginBody = {
            email: email,
            password: password
        }
        const loginJson = JSON.stringify(loginBody);

        const response = await fetch("", {
            method: "GET",
            body: loginJson
        });

        if (response.status == 200) {
            console.log("Success!");
            return true;
        }
        console.log("Failed.");
    }
}