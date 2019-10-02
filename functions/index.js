const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const cors = require('cors')({ origin: true });
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const SENDGRID_API_KEY = ''



const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(SENDGRID_API_KEY);

exports.httpEmail = functions.https.onRequest((req, res) => {

    cors( req, res, () => { 

        const toName  = req.body.toName;
        const toEmail = req.body.toEmail;

        const msg = {
            to: toEmail,
            from: '',
            subject:  'Hello hello, New Follower',
            // text: `Hey ${toName}. You have a new follower!!! `,
            // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,

            // custom templates
            templateId: '',
            substitutionWrappers: ['{{', '}}'],
            substitutions: {
              name: toName
              // and other custom properties here
            }
        };

        return sgMail.send(msg)
                
            .then(() => res.status(200).send('email sent!') )
            .catch(err => res.status(400).send(err) )

        });

});