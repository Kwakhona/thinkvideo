/**
 * Created by jpmeyer on 2017/04/13.
 */
class AuthService {
    constructor($cookies, $q) {
        'ngInject';
        this.$cookies = $cookies;
        this.$q = $q;

    }

    setToken(token) {
        this.$cookies.put('token', token);
    }

    getToken(token) {
        return this.$cookies.get('token');
    }

    removeToken() {
        this.$cookies.remove('token');
        this.$cookies.remove('username');
    }

    isLoggedIn() {
        return this.$cookies.get('token') ? this.$q.resolve() : this.$q.reject();
    }

    isNotLoggedIn() {
        return this.$cookies.get('token') ? this.$q.reject() : this.$q.resolve();
    }

    setUser(username, type, accessGroups) {
        this.$cookies.put('username', username);
    }

    getUser() {
        return {
            username: this.$cookies.get('username')
        };
    }
}

export default AuthService;

