import { google } from "googleapis";

let auth;
let googleSheets;

export const getGoogleUtils = async () => {
  if (auth && googleSheets) {
    return { auth, googleSheets };
  }

  // Create client instance for auth
  auth = new google.auth.GoogleAuth({
    keyFile: "keys.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  // Instance of Google Sheets API
  googleSheets = google.sheets({ version: "v4", auth: client });
  // Get metadata about spreadsheet
  // const metaData = await googleSheets.spreadsheets.get({
  //   auth,
  //   spreadsheetId,
  // });

  return { auth, googleSheets };
};
