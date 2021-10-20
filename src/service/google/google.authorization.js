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
        const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
        return new Promise((resolve, reject) => {
            const authorizeUrl = oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES,
            });
            try {
                console.log('Authorize by visiting this url:', authorizeUrl);
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                });
                rl.question('Enter the code from that page here: ', async code => {
                    const oAuthToken = await oAuth2Client.getToken(code);
                    await oAuth2Client.setCredentials(oAuthToken);
                    resolve(oAuthToken.tokens);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async authorization() {
        const tokenPath = process.env.TOKEN_PATH;
        const oAuth2Client = new google.auth.OAuth2(
            this.clientId,
            this.clientSecret,
            this.redirectUris[0]
        );

        try {
            const oAuthTokenFromTokenFile = await fs.promises.readFile(process.env.TOKEN_PATH);

            console.log('Token file found, applying token to use Google Apis...');
            oAuth2Client.setCredentials(JSON.parse(oAuthTokenFromTokenFile));

            return oAuth2Client;
        } catch (error) {
            GoogleAuthorizationImpl.getNewToken(oAuth2Client)
                .then(newOAuthToken => {
                    fs.writeFile(tokenPath, JSON.stringify(newOAuthToken), writeFileError => {
                        console.log('Writing Token...');
                        if (writeFileError) {
                            throw new Error(writeFileError);
                        }
                        console.log('Token has been completely written, Check the token file to get it');
                    });
                });
        }
    }
}
