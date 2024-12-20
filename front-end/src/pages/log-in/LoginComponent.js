import { BaseComponent } from "../../BaseComponent.js";
import { Events } from "../../eventhub/Events.js";
import { DATABASE } from "../../main.js"; // Import the database service
import APP_DATA from "../../config/ApplicationData.js";

export class LoginComponent extends BaseComponent {
  constructor() {
    super("login", "./pages/log-in/LoginStyles.css");
  }

  _buildHTML() {
    return `
      <div class="login-container">
        <h2>Login</h2>
        <h3 id="login-error">Enter Username and Password</h3>
        <form id="login-form">
          <input type="text" id="username" placeholder="Username" required />
          <input type="password" id="password" placeholder="Password" required />
          <button type="submit">Log In</button>
        </form>
        <button id="signup-button" class="secondary-btn">Sign Up</button>
      </div>
    `;
  }

  _addEventListeners() {
    this.addCustomEventListener(Events.LoadLoginPage, () => this._render());
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");
    const signup = document.getElementById("signup-button");

    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      try {
        const userData = await DATABASE.loginUser(username, password);
        if (!userData) return;

        // Now set the username in the application data
        APP_DATA.setUsername(userData.username);

        this.update(Events.LoginSuccess, userData); // Notify other components of login success
      } catch (error) {
        document.getElementById("login-error").textContent =
          "Invalid username or password";
      }
    });

    signup.addEventListener("click", async () => {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      try {
        const userData = await DATABASE.registerUser(username, password);
        if (!userData) return;

        document.getElementById("login-error").textContent = "Account created";
      } catch (error) {
        document.getElementById("login-error").textContent =
          "Couldn't register account";
      }
    });
  }

  _validateCredentials(username, password) {
    // Example validation logic (replace with actual logic)
    return username === "user" && password === "pass";
  }

  // Render the login component
  _render() {
    this.bodyElement.style.display = "block";
  }
}
