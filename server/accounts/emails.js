Accounts.emailTemplates.siteName = "Surprese";
Accounts.emailTemplates.from     = "Surprese <admin@surprese.me>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[Surprese] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "support@surprese.me",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};
