class AppConfig {
    public registerUrl = "http://localhost:4000/api/auth/register/"
    public loginUrl = "http://localhost:4000/api/auth/login/"
    public userVacationsUrl = "http://localhost:4000/api/user/vacations/";
    public adminVacationsUrl = "http://localhost:4000/api/admin/vacations/";
}

const appConfig = new AppConfig();

export default appConfig;
