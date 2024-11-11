export class Auth {
  constructor(url) {
    this.endpoint = url;
  }

  async registerUser(firstName, lastName, email, password) {
    const registerBody = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
    const registerJson = JSON.stringify(registerBody);

    console.log(registerJson);

    const response = await fetch(`${this.endpoint}/auth/register`, {
      method: "POST",
      body: registerJson,
      headers: {
        "Content-Type": "application/json", 
      },
    });

    if (response.status == 200) {
      console.log("Success!");
      return true;
    }
    console.log("Failed.");
    return false;
  }

  async loginUser(email, password) {
    const loginBody = {
      email: email,
      password: password,
    };
    const loginJson = JSON.stringify(loginBody);

    const response = await fetch(`${this.endpoint}/auth/login`, {
      method: "POST",
      body: loginJson,
      headers: {
        "Content-Type": "application/json", 
      },
      credentials: 'include'
    });

    if (response.status == 200) {
      console.log("Success!");
      return true;
    }
    console.log("Failed.");
    return false;
  }

  async logoutUser() {
    const response = await fetch(`${this.endpoint}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      credentials: 'include'
    });

    if (response.status == 200) {
      console.log("a");
      
      console.log("Success!");
      return true;
    }
    console.log("Failed.");
    return false;
  }
}
