class AppConfig {
    public registerUrl = "http://localhost:4001/api/auth/register/"
    public loginUrl = "http://localhost:4001/api/auth/login/"
    public userVacationsUrl = "http://localhost:4001/api/user/vacations/";
    public adminVacationsUrl = "http://localhost:4001/api/admin/vacations/";
    public adminImageUrl = `http://localhost:4001/api/admin/vacations/images/`;
    public followUrl = `http://localhost:4001/api/user/follow/`;
    public reportUrl = `http://localhost:4001/api/admin/vacations/reports/`;
}

const appConfig = new AppConfig();

export default appConfig;
