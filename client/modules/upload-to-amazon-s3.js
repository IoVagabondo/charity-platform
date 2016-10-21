let template;

let _getFileFromInput = (event) => event.target.files[0];

let _setPlaceholderText = (string = "Click or Drag a File Here to Upload") => {
    template.find(".alert span").innerText = string;
};

let _addUrlToDatabase = (url) => {

    Meteor.call("storeUrlInDatabase", url, (error) => {
        if (error) {
            Bert.alert(error.reason, "warning");
            _setPlaceholderText();
        } else {
            Bert.alert("File uploaded to Amazon S3!", "success");
            _setPlaceholderText();
        }
    });
};

// let _uploadFileToAmazon = ( file ) => {
//   const uploader = new Slingshot.Upload( "uploadToAmazonS3" );
//   let urlToFile;
//   uploader.send( file, ( error, url ) => {
//     if ( error ) {
//       Bert.alert( error.message, "warning" );
//       _setPlaceholderText();
//       urlToFile = null;
//     } else {
//       Bert.alert( "File uploaded to Amazon S3!", "success" );
//       _setPlaceholderText();
//       urlToFile = url;
//     }
//     console.log(urlToFile);
//     return urlToFile;
//   });

// };

let upload = function(options, callback) {
    template = options.template;
    let file = _getFileFromInput(options.event);

    _setPlaceholderText(`Uploading ${file.name}...`);

    const uploader = new Slingshot.Upload("uploadToAmazonS3");

    uploader.send(file, (error, url) => {
        if (error) {
            Bert.alert(error.message, "warning");
            _setPlaceholderText();
            callback();
        } else {
            Bert.alert("File uploaded to Amazon S3!", "success");
            _setPlaceholderText();
            callback(options.id, url);
        }
    });

};

Modules.client.uploadToAmazonS3 = upload;
