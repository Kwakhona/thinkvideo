import NavMenuController from './nav-menu.controller';
import NavMenuTemplate from './nav-menu.template.html';
import './nav-menu.scss';

export default {
    controller: NavMenuController,
    template: NavMenuTemplate,
    controllerAs: '$ctrl',
    bingings: {

    },
    transclude: true
};