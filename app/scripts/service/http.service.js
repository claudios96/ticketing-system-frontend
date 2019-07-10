
/**
 *  @ngdoc  service
 *  @module  ticketsystem.restService
 *  @name   httpService
 *  @description    Service manages HTTP requests.
 */
mainAngularModule.service('httpService', ['$http',
    function ($http) {
        //let CONNECTION = {url: "http://172.20.0.50:8200/ticketsystem"};

        return {

            /**
             *  @ngdoc function
             *  @module ticketsystem.restService
             *  @name get
             *  @description HTTP GET function.
             *  @param url      Service URL
             *  @param header   Data Header
             *  @returns {*}    HTTP Response
             */
            get: function (url, header) {
                return $http({
                    "url": url,
                    "method": "GET",
                    "headers": header
                });
            },

            /**
             *  @ngdoc function
             *  @module ticketsystem.restService
             *  @name get
             *  @description HTTP POST function.
             *  @param url      Service URL
             *  @param data     Request body
             *  @param header   Data Header
             *  @returns {*}    HTTP Response
             */
            post: function (url, data, header) {
                var head = "";
                if (header) head = header;
                return $http({
                    "method": "POST",
                    "url": url,
                    "headers": head,
                    "data": data
                });
            },

            /**
             *  @ngdoc function
             *  @module ticketsystem.restService
             *  @name get
             *  @description HTTP PUT function.
             *  @param url      Service URL
             *  @param id       ID to find the requested object
             *  @param data     Request body
             *  @param header   Data Header
             *  @returns {*}    HTTP Response
             */
            put: function (url, id, data, header) {
                var head = "";
                if (header) head = header;
                return $http({
                    "method": "PUT",
                    "url": url + "/" + id,
                    "headers": head,
                    "data": data
                });
            },

            /**
             *  @ngdoc function
             *  @module ticketsystem.restService
             *  @name get
             *  @description HTTP DELETE function.
             *  @param url      Service URL
             *  @param id       ID to find the requested object
             *  @param header   Data Header
             *  @returns {*}    HTTP Response
             */
            delete: function (url, id, header) {
                var head = "";
                if (header) head = header;
                return $http({
                    "method": "DELETE",
                    "url": url + "/" + id,
                    "headers": header
                });
            }
        };
}]);