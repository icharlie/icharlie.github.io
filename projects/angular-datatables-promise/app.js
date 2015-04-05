(function(window) {
    'use strict';
    angular.module('showCase', ['datatables', 'ngResource'])
        .controller('DataReloadWithPromiseCtrl', DataReloadWithPromiseCtrl);

    function DataReloadWithPromiseCtrl($scope, $q, DTOptionsBuilder, DTColumnBuilder, $resource, DTInstances) {
        var vm = this;
        vm.dtOptions = DTOptionsBuilder.fromFnPromise(localPromise)
            .withPaginationType('full_numbers');

        vm.dtColumns = [
            DTColumnBuilder.newColumn('id').withTitle('ID').notVisible(),
            DTColumnBuilder.newColumn('firstName').withTitle('First name'),
            DTColumnBuilder.newColumn('lastName').withTitle('Last name')
        ];
        vm.localPromise = localPromise;

        vm.add = add;

        vm.user = getNewUser();

            DTInstances.getLast().then(function (dtInstance) {
            vm.dtInstance = dtInstance;
        });

        function getNewUser() {
            return {
                id: null,
                firstName: '',
                lastName: ''
            };
        }

        function add() {
            var newUser = angular.copy(vm.user);
            // Do ajax call to add a new user to server
            // Update front-end users model
            vm.users.push(newUser);
            vm.user = getNewUser();
            vm.dtInstance.reloadData();
        }

        function localPromise() {
            var dfd = $q.defer();
            if (vm.users) {
                dfd.resolve(vm.users);
            } else {
                var remotePromise = $resource('data.json').query().$promise;
                remotePromise.then(function (users) {
                    vm.users = users;
                    dfd.resolve(vm.users);
                });
            }
            return dfd.promise;
        }
    }
})(window);
