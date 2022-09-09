import { getGoogleUtils } from "./google.server";

const spreadsheetId = "1BnhE0HuBiqROZLKM1D5xZzYxXQvqINdDAfkemutQtVM";

export const getRows = async () => {
  const { auth, googleSheets } = await getGoogleUtils();
  const rows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Arkusz1!A1:D4",
  });
  console.log("Retrieved data:");
  console.log(rows.data.values);
};

export const writeRows = async () => {
  // Write row(s) to spreadsheet
  const { auth, googleSheets } = await getGoogleUtils();
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Arkusz1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [["First Test", "Second", "1/1/2020", "4", "4.5", "4,5"]],
    },
  });
};
