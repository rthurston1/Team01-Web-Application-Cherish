class ApplicationData {
  constructor() {}

  setUsername(username) {
    this.username = username;
  }

  getUsername() {
    return this.username ? this.username : "user";
  }
}

const APP_DATA = new ApplicationData();
export default APP_DATA;
