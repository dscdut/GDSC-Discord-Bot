import { google } from 'googleapis';
import { GoogleAuthorizationImpl } from './google.authorization';

require('dotenv').config();

export class GoogleServiceImpl {
    authContext

    returnedData

    constructor() {
        this.authContext = new GoogleAuthorizationImpl(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URIS.split(', ')
        );
    }

    async getGoogleSheetData() {
        try {
            const auth = await this.authContext.authorization();
            const sheets = google.sheets({ version: 'v4', auth });
            const check = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.SHEET_ID,
                range: 'A1:B4'
            });
            return check.data.values.slice(1);
        } catch (error) {
            return new Error(`The API returned an error: ${error}`);
        }
    }
}
export const GoogleService = new GoogleServiceImpl();
