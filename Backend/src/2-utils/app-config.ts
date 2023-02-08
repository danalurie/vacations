class AppConfig {
    public port = 4000;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "vacationsdatabase";
    public userImage = `http://localhost:${this.port}/api/user/vacations/images`
    public adminImage = `http://localhost:${this.port}/api/admin/vacations/images`
}

const appConfig = new AppConfig();

export default appConfig;
