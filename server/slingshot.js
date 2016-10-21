Slingshot.fileRestrictions( "uploadToAmazonS3", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 1 * 1024 * 1024
});

Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
  bucket: "charity-platform-pictures",
  acl: "public-read",
  region: "sa-east-1",
  authorize: function () {
    //Deny uploads if user is not logged in.

    // console.log("authorize function: %o",this.userId);
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },
  key: function ( file ) {
     //Store file into a directory by the user's username.
    // var user = Meteor.users.findOne( this.userId );
    var storagePlace = "users/" +this.userId + "/" + file.name;
    return storagePlace;
  }
});