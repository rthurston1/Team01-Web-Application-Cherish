export class LoginPage {
    constructor() {
      this.container = document.createElement("div");
      this.container.classList.add("login-container");
      this.render();
      this.addEventListeners();
    }
  
    render() {
      this.container.innerHTML = `
        <h2>Login</h2>
        <form id="login-form">
          <input type="text" id="username" placeholder="Username" required />
          <input type="password" id="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p id="error-message" class="hidden"></p>
      `;
      document.body.appendChild(this.container);
    }
  
    addEventListeners() {
      const form = document.getElementById("login-form");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
  
        // For now, log the credentials to the console
        console.log({ username, password });
  
        // In the next steps, we call the backend API here
        this.handleLogin(username, password);
      });
    }
  
    async handleLogin(username, password) {
      // This is where we'll add API calls later
      console.log(`Attempting login for ${username}`);
    }
  }
  