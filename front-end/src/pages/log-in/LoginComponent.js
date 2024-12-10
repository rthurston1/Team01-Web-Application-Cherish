import { BaseComponent } from "../../BaseComponent.js";
import { Events } from "../../eventhub/Events.js";
import { DATABASE } from "../../main.js"; // Import the database service


export class LoginComponent extends BaseComponent {
  constructor() {
    super("login", "./pages/log-in/LoginStyles.css");
  }

  _buildHTML() {
    return `
      <div class="login-container">
        <h2>Login</h2>
        <form id="login-form">
          <input type="text" id="username" placeholder="Username" required />
          <input type="password" id="password" placeholder="Password" required />
          <button type="submit">Log In</button>
        </form>
        <button id="signup-button" class="secondary-btn">Sign Up</button>
        <p id="login-error" class="hidden">Invalid username or password!</p>
      </div>
    `;
  }

  _addEventListeners() {
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (this._validateCredentials(username, password)) {
        this.update(Events.LoginSuccess, { username }); // Notify other components of login success
        loginError.classList.add("hidden"); // Hide error message
      } else {
        loginError.classList.remove("hidden"); // Show error message
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
