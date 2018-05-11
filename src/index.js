import './index.scss';
import CoreModule from './core/core.module';

angular.module('app', [
        CoreModule.name,
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'ui.router',
        'toastr'
    ])
    
    .config(($stateProvider, $urlRouterProvider, $httpProvider, toastrConfig) => {
        'ngInject';
        VodacomNimbleProvider.setEnvironment(ENV);

        angular.extend(toastrConfig, {
            autoDismiss: true,
            containerId: 'toast-container',
            maxOpened: 3,
            newestOnTop: true,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
        });


        let isLoggedIn = function ($state, AuthService) {
            'ngInject';
            return AuthService.isLoggedIn().then((response) => {
                return response;
            }, () => {
                $state.go('Login');
            });
        };


        let isNotLoggedIn = function ($state, AuthService) {
            'ngInject';
            return AuthService.isNotLoggedIn().then((response) => {
                return response;
            }, () => {
                $state.go('CustomerSearch');
            });
        };

        $stateProvider
            .state('Login', {
                url: '/login',
                template: '<login></login>',
                resolve: {
                    auth: isNotLoggedIn
                }
            })
            .state('Dashboard', {
                url: '/dashboard',
                template: '<dashboard></dashboard>'
            });

        $httpProvider.interceptors.push('AuthInterceptor');

        $urlRouterProvider.otherwise('/login');
    });

angular.element(document).ready(() => {
    angular.bootstrap(document, ['app']);
});
