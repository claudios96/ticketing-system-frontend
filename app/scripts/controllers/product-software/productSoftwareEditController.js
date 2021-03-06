'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .controller('ProductSoftwareEditCtrl', ['$scope', '$state', '$stateParams', 'softwareProductDataFactory', 'ErrorStateRedirector', 'StateMachineDataFactory',
        function ($scope, $state, $stateParams, softwareProductDataFactory, ErrorStateRedirector, StateMachineDataFactory) {
            let ctrl = this;



            softwareProductDataFactory.metadata(function (response) {
                ctrl.targetTypes = response.data.targetTypes;
                console.log("types", ctrl.targetTypes)
            }, function () {
                alert("Invalid metadata");
            });

            StateMachineDataFactory.getStateMachines(function (response) {
                ctrl.stateMachines = response.data;
                console.log("stateMachines", ctrl.stateMachines)
            }, function () {
                alert("Error: getStateMachines")
            });


            function setCurrentSoftwareProduct() {
                softwareProductDataFactory.GetSingle($stateParams.spId,
                    function (response) {
                        ctrl.currentSoftwareProduct = response;
                        console.log("curreSoft", response);
                    }, function (error) {
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel recupero del prodotto"});
                    });
            }

            function saveProductFn() {

                let tags = ctrl.currentSoftwareProduct.categories;
                ctrl.currentSoftwareProduct.categories = [];
                ctrl.currentSoftwareProduct.targetState = "ACTIVE";

                for (let i = 0; i < tags.length; i++) {
                    ctrl.currentSoftwareProduct.categories[i] = tags[i].text;
                }

                softwareProductDataFactory.Update(ctrl.currentSoftwareProduct,
                    function (response) {
                        console.log(response);
                        $state.go('productsoftware.list', {}, {reload: 'productsoftware.list'});
                    }, function (error) {
                        console.log("currSoftUpdate", ctrl.currentSoftwareProduct);
                        ErrorStateRedirector.GoToErrorPage({Messaggio: "Errore nel salvataggio del prodotto"});
                    });

            }


            ctrl.saveProduct = saveProductFn;

            setCurrentSoftwareProduct();

        }]);

