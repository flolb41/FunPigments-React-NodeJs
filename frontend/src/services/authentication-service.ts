import axios from "axios";

const url = "http://localhost:3000/api/auth/";

class AuthService {
    static isAuthenticated: boolean = false;

    static login(username: string, password: string): Promise<boolean> {
        axios.post(url + "login", {
            username: username,
            password: password
        }).then(res => {
            AuthService.isAuthenticated = res.data.user.isAuth;
            localStorage.setItem("user", JSON.stringify(res.data.user));
            return AuthService.isAuthenticated;
        }).catch(err => {
            console.log(err);
            return false;
        });
        return new Promise(resolve => {
            this.isAuthenticated = AuthService.isAuthenticated;
            resolve(this.isAuthenticated);
        });
    }
    static register(username: string, password: string, email: string, city: string, thumbnail: string): Promise<boolean> {
        axios.post(url + "register", {
            username: username,
            password: password,
            email: email,
            city: city,
            thumbnail: thumbnail
        }).then(res => {
            AuthService.isAuthenticated = res.data.user.isAuth;
            localStorage.setItem("user", JSON.stringify(res.data.user));
            return AuthService.isAuthenticated;
        }).catch(err => {
            console.log(err);
            return false;
        });
        return new Promise(resolve => {
            this.isAuthenticated = AuthService.isAuthenticated;
            resolve(this.isAuthenticated);
        });
    }
    static logout() {
        AuthService.isAuthenticated = false;
        localStorage.removeItem("user");
    }
}

export default new AuthService();