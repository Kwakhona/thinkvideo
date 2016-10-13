import ProjectListController from './project-list.controller';

describe('Project List Controller', () => {

    beforeEach(angular.mock.module('app'));

    var projectService;
    var toastr;
    var $uibModal;
    var $q;
    var controller;
    var $scope;

    beforeEach(angular.mock.inject(( _ProjectService_, _toastr_, _$uibModal_, _$q_, _$rootScope_) => {
        projectService = _ProjectService_;
        toastr = _toastr_;
        $uibModal = _$uibModal_;
        $q = _$q_;
        $scope = _$rootScope_.$new();
        controller = createController();
    }));

    function createController() {
        let controller = new ProjectListController(projectService, toastr, $uibModal, $q);
        return controller;
    }

    describe('onInit', () => {
        it('should call get()', () => {
            let defer = $q.defer();
            spyOn(controller.projectService, 'get').and.returnValue(defer.promise);
            controller.$onInit();
            expect(controller.projectService.get).toHaveBeenCalled();
            // controller.get();
        });
    });

    describe('get', () => {
        it('should call project service get', () => {
            let defer = $q.defer();
            spyOn(controller.projectService, 'get').and.returnValue(defer.promise);
            controller.get()
            expect(controller.projectService.get).toHaveBeenCalled();
        });

        it('should set the results array once project service resolves', () => {
            let projectList = [
                {
                    pk: 3,
                    title: 'third title'
                },
                {
                    pk: 4,
                    title: 'fourth title'
                }
            ];
            let defer = $q.defer();
            defer.resolve({data: projectList});
            spyOn(controller.projectService, 'get').and.returnValue(defer.promise);
            controller.get();
            $scope.$apply();
            controller.results = projectList;
        });

        it('should throw toastr error when project service does not resolve', () => {
            let defer = $q.defer();
            defer.reject();
            spyOn(controller.projectService, 'get').and.returnValue(defer.promise);
            spyOn(controller.toastr, 'error');
            controller.get();
            $scope.$apply();
            expect(controller.toastr.error).toHaveBeenCalled();
        });
    });

    describe('delete', () => {
        it('calls project service delete() with id', () => {
            let defer = $q.defer();
            spyOn(controller.projectService, 'delete').and.returnValue(defer.promise);
            controller.delete(2);
            expect(controller.projectService.delete).toHaveBeenCalledWith(2);
        });

        it('throws toast success if promise resolves', () => {
            let defer = $q.defer();
            defer.resolve();
            spyOn(controller.projectService, 'delete').and.returnValue(defer.promise);
            controller.delete(3);
            spyOn(controller.toastr, 'success');
            spyOn(controller, 'removeRow').and.returnValue(true);
            $scope.$apply();
            expect(controller.toastr.success).toHaveBeenCalled();
            expect(controller.removeRow).toHaveBeenCalled();
        });

        it('throws toast error if promise rejects', () => {
            let defer = $q.defer();
            defer.reject();
            spyOn(controller.projectService, 'delete').and.returnValue(defer.promise);
            spyOn(controller.toastr, 'error');
            controller.delete(3);
            $scope.$apply();
            expect(controller.toastr.error).toHaveBeenCalled();
        });
    });

    describe('removeRow', () => {
        it('should remove the row', () => {
            spyOn(angular, 'element').and.callThrough();
            controller.removeRow(2);
            expect(angular.element).toHaveBeenCalled();
        });
    });

    describe('create', () => {
        it('calls _openModal() method with no params', () => {
            spyOn(controller, '_openModal');
            controller.create();
            expect(controller._openModal).toHaveBeenCalled();
        });
    });

    describe('update', () => {
        it('calls _openModal() method', () => {
            spyOn(controller, '_openModal');
            controller.update(3);
            expect(controller._openModal).toHaveBeenCalledWith(3);
        });
    });

    describe('_openModal', () => {
        it('should use bootstrap ui to open modal', () => {
            spyOn(controller.$uibModal, 'open').and.returnValue(true);
            controller._openModal();
            expect(controller.$uibModal.open).toHaveBeenCalled();
        });
    });

    describe('modalResolve', () => {
        it('returns an object for modal resolve', () => {
            let object = controller.modalResolve(3);
            expect(object.projectId()).toBe(3);

            spyOn(controller, 'get').and.returnValue("Just some return value that will validate function binding");
            expect(object.refreshGrid()()).toEqual(controller.get());
        });
    });
});