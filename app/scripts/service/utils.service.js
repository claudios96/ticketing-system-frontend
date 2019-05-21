/**
 *  @ngdoc  service
 *  @module  ticketsystem.utilService
 *  @name   util
 *  @description   Service returns all the utility functions.
 */
mainAngularModule.service('util', function () {
        return {
            /**
             *  @ngdoc function
             *  @name getBase64
             *  @description Function encodes the image file into base64 string.
             *  @param file image file to encode
             *  @returns {Promise<any>} base64 image string in case of success, error otherwise
             */
            getBase64(file) {
                return new Promise((resolve, reject) => {

                    // File reader
                    let reader = new FileReader();

                    //  Get data as a URL representing the file as a base64 encoded string
                    reader.readAsDataURL(file);

                    //  Event handler executed when the load event is fired
                    reader.onload = function () {
                        resolve(reader.result);
                    };

                    //  Event handler executed when the error event is fired
                    reader.onerror = function (error) {
                        console.log('Error: ', error);
                        reject('rejected', error)
                    };
                })
            },

            /**
             *  @ngdoc function
             *  @name getBase64
             *  @description Function decodes the base64 image into a file with the correct format.
             *  @param item ticket
             *  @returns {Promise<any>} image file in case of success, error otherwise
             */
            postBase64(item) {
                return new Promise((resolve, reject) => {

                    //  Variables
                    var dataURI, byteString, typeFile,link;

                    //  Base64 string
                    dataURI = item.attachedFile;

                    //  If the image is not base64, reject.
                    if (dataURI.split(',')[0].indexOf('base64') < 0)
                        reject('rejected', "Image not found");
                    else {
                        //  Image data and format
                        byteString = atob(dataURI.split(',')[1]);
                        typeFile = dataURI.split(',')[0]
                            .split(':')[1]
                            .split('/')[1]
                            .split(';')[0];

                        //  Write the bytes of the string to a typed array
                        var ia = new Uint8Array(byteString.length);
                        for (var i = 0; i < byteString.length; i++) {
                            ia[i] = byteString.charCodeAt(i);
                        }

                        //  Generate a temp <a/> tag for the download
                        link = document.createElement("a");
                        link.href = item.attachedFile;

                        //  Set the visibility
                        link.style = "visibility:hidden";

                        //  Set the name of the file to download
                        link.download = "Ticket" + item.id + "." + typeFile
                        resolve(link);
                    }
                })
            }
        }
    }
)

