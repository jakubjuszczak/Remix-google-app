import { getGoogleUtils } from "./google.server";
import { json } from "@remix-run/node";

const spreadsheetId = "1BnhE0HuBiqROZLKM1D5xZzYxXQvqINdDAfkemutQtVM";

const convertDate = (date) => {
  return date.split("-").reverse().join(".");
};

export const getRows = async () => {
  const { auth, googleSheets } = await getGoogleUtils();
  const rows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Arkusz1!A1:D4",
  });
  return rows.data.values;
};

export const getCarTypes = async () => {
  const { auth, googleSheets } = await getGoogleUtils();
  const rows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Config!A2:B5",
  });
  return rows.data.values.map((value) => ({
    type: value[0],
    capacity: parseInt(value[1]),
  }));
};

export const writeRows = async (formdata) => {
  console.log(formdata);

  // Write row(s) to spreadsheet
  const dataForSheet = [
    formdata.formname,
    `${formdata.firstname} ${formdata.lastname}`,
    convertDate(formdata.startdate),
    convertDate(formdata.enddate),
    " ",
    formdata.cartype,
    formdata.hoteldata,
  ];

  const { auth, googleSheets } = await getGoogleUtils();
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Arkusz1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [dataForSheet],
    },
  });

  // dodaj sortowanie
};
