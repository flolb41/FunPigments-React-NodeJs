import axios from "axios";

const baseUrl = "http://localhost:3000/api/auth/";

class AuthService {
    static isAuthenticated: boolean = false;


    static login(username: string, password: string): Promise<boolean> {
        console.log(username, password);
        axios.post(baseUrl + "login", {
            username: username,
            password: password
        }).then(res => {
            AuthService.isAuthenticated = res.data.user.isAuth;
            localStorage.setItem("user", JSON.stringify(res.data.user));
            return AuthService.isAuthenticated;
        })
        return new Promise(resolve => {
            setTimeout(() => {
                this.isAuthenticated = AuthService.isAuthenticated;
                resolve(this.isAuthenticated);
            }, 1000);
        });
    }

    static register(username: string, password: string, email: string, city: string, thumbnail: string): Promise<boolean> {
        axios.post(baseUrl + "register", {
            username: username,
            password: password,
            email: email,
            city: city,
            thumbnail: thumbnail
        }).then(res => {
            AuthService.isAuthenticated = res.data.user.isAuth;
            localStorage.setItem("user", JSON.stringify(res.data.user));
        }).catch(err => {
            console.log(err.message);
            return false;
        });
        return new Promise(resolve => {
            const isAuthenticated = AuthService.isAuthenticated;
            resolve(isAuthenticated);
        });
    }

    static logout() {
        AuthService.isAuthenticated = false;
        localStorage.removeItem("user");
        
    }

    static updateUser(username: string, password: string, email: string, city: string, thumbnail: string): Promise<boolean> {
        axios.put(baseUrl, {
            username: username,
            password: password,
            email: email,
            city: city,
            thumbnail: thumbnail
        }).then(res => {
            AuthService.isAuthenticated = res.data.user.isAuth;
            localStorage.setItem("user", JSON.stringify(res.data.user));
        }).catch(err => {
            console.log(err.message);
            return false;
        });
        return new Promise(resolve => {
            const isAuthenticated = AuthService.isAuthenticated;
            resolve(isAuthenticated);
        });
    }
    static deleteUser(id: string): Promise<boolean> {
        axios.delete(baseUrl + "delete", {
            data: {
                id: id
            }
        }).then(res => {
            AuthService.isAuthenticated = res.data.user.isAuth;
            localStorage.removeItem("user");
        }).catch(err => {
            console.log(err.message);
            return false;
        });
        return new Promise(resolve => {
            const isAuthenticated = AuthService.isAuthenticated;
            resolve(isAuthenticated);
        });
    }
}

export default AuthService;