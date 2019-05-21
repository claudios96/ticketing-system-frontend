'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .controller('ProductSoftwareListCtrl', ['$scope', 'softwareProductDataFactory', 'ErrorStateRedirector', 'DTOptionsBuilder',
        'DTColumnDefBuilder', 'AclService', 'httpService',
        function ($scope, softwareProductDataFactory, ErrorStateRedirector, DTOptionsBuilder, DTColumnDefBuilder, AclService, httpService) {

            var ctrl = this;
            ctrl.refreshProduct = refreshProductFn;
            ctrl.editProduct = editProductFN;
            ctrl.deleteProduct = deleteProductFN;
            ctrl.retireTarget = retireTargetFN;
            ctrl.rehabTarget = rehabTargetFN;
            ctrl.isRetired = isRetiredFN;



            $scope.dtOptions = DTOptionsBuilder.newOptions().withDOM('C<"clear">lfrtip');
            $scope.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(4).notSortable()
            ];


            refreshProductFn();

            function refreshProductFn() {
                console.log("refresh Products");
                softwareProductDataFactory.GetAll(
                    function (products) {
                        ctrl.products = products;
                        console.log(products);
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero dei prodotti"});
                    });

            }

            function editProductFN(sProduct) {
                console.log("update product with id: " + sProduct.id);
                softwareProductDataFactory.Update(sProduct,
                    function () {
                        refreshProductFn();
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nella modifica del prodotto"});
                    });

            }

            function deleteProductFN(id) {
                console.log("delete product with id: " + id);
                softwareProductDataFactory.Remove(id,
                    function () {
                        refreshProductFn();
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nell'eliminazione del prodotto"});
                    });

            }


            /**
             * @ngdoc               function
             * @name                removeTarget
             * @description         Function sets a Target as "Unavailable" via an HTTP PUT.
             *
             * @param index         id row of the Target
             */
            function retireTargetFN ($index) {

                let targetToRetire = ctrl.products[$index];
                let id = targetToRetire.id;

                softwareProductDataFactory.Retire(id, function (response) {
                            ctrl.products[$index].targetState = "RETIRED";
                        },
                        function error(response) {
                            console.log("Error!" + response);
                        });
            };


            /**
             * @ngdoc               function
             * @name                rehabTarget
             * @description         Function sets an unavailable Target as "Available" again via an HTTP PUT.
             *
             * @param index         id row of the Target
             */
            function rehabTargetFN ($index) {

                let targetToRehab = ctrl.products[$index];
                let id = targetToRehab.id;

                softwareProductDataFactory.Rehab(id, function (response) {
                            ctrl.products[$index].targetState = "ACTIVE";
                        },
                        function error(response) {
                            console.log("Error!" + response);
                        });
            };


            /**
             * @ngdoc               function
             * @name                isRetired
             * @description         Function checks if a Target is "Unavailable" or not.
             *
             * @param index         id row to check
             * @returns {boolean}   true is the Target is "Unavailable", false otherwise
             */
            function isRetiredFN ($index) {
                if (ctrl.products[$index].targetState === "RETIRED")
                    return true;
                else
                    return false;
            };

        }]);