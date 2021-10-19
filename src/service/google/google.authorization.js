import { google } from 'googleapis';
import fs from 'fs';
import readline from 'readline';

require('dotenv').config();

export class GoogleAuthorizationImpl {
    clientId;

    clientSecret;

    redirectUris;

    constructor(clientId, clientSecret, redirectUris) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUris = redirectUris;
    }

    static getNewToken(oAuth2Client) {
        const tokenPath = process.env.TOKEN_PATH;
        const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });

        console.log('Authorize by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question('Enter the code from that page here: ', code => {
            rl.close();
            try {
                oAuth2Client.getToken(code, (authorError, oAuthToken) => {
                    if (authorError) throw new Error('Error while trying to retrieve access token', authorError);

                    oAuth2Client.setCredentials(oAuthToken);

                    fs.writeFile(tokenPath, JSON.stringify(oAuthToken), writeFileError => {
                        console.log('Writing Token...');
                        if (writeFileError) {
                            throw new Error(writeFileError);
                        }
                        console.log('Token has been completely written, Check the token file to get it');
                    });
                });
            } catch (error) {
                console.log(error.message);
            }
        });
    }

    authorization(callback) {
        const oAuth2Client = new google.auth.OAuth2(
            this.clientId, this.clientSecret, this.redirectUris[0]
        );
        fs.readFile(process.env.TOKEN_PATH, (err, oAuthToken) => {
            if (err) {
                GoogleAuthorizationImpl.getNewToken(oAuth2Client);
            } else {
                console.log('Token file found, applying token to use Google Apis...');
                oAuth2Client.setCredentials(JSON.parse(oAuthToken));
                callback(oAuth2Client);
            }
        });
    }
}
