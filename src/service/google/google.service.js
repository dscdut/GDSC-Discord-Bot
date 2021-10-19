import { google } from 'googleapis';
import { GoogleAuthorizationImpl } from './google.authorization';

require('dotenv').config();

class GoogleServiceImpl {
    authContext

    constructor() {
        this.authContext = new GoogleAuthorizationImpl(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URIS.split(', ')
        );
    }

    getGoogleSheetData(msg) {
        try {
            this.authContext.authorization(auth => {
                const sheets = google.sheets({ version: 'v4', auth });
                sheets.spreadsheets.values.get({
                    spreadsheetId: process.env.SHEET_ID,
                    range: 'A1:B4',
                },
                (err, res) => {
                    if (err) throw new Error(`The API returned an error: ${err}`);
                    const rows = res.data.values.slice(1);

                    if (rows.length) {
                        const toStringData = rows.reduce((prev, curr) => `${prev + curr[0]}: ${curr[1]} \n`, '');
                        msg.reply(toStringData);
                        console.log('Bot has sent data');
                        return;
                    }
                    console.log('No data found.');
                });
            });
        } catch (error) {
            return error;
        }
    }
}

export const GoogleService = new GoogleServiceImpl();
