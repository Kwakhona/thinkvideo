import NavMenuComponent from './nav-menu/nav-menu.component';
import LoginComponent from './login/login.component';

export default angular.module('core.components', [])
    .component('login', LoginComponent)
    .component('navMenu', NavMenuComponent);
