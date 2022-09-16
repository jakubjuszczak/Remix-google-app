import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { getRows, writeRows } from "~/utils/spreadsheets.server";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get("actionType");
  if (action === "getData") {
    await getRows();
  }
  if (action === "addData") {
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    await writeRows(data);
  }

  return redirect("/");
};

export default function Index() {
  const formname = "Form name";

  return (
    <Form method="POST">
      <h1>{formname}</h1>
      <input type="hidden" name="formname" value={formname} />
      <div>
        <label>
          First name:
          <input type="text" name="firstname" defaultValue="John" />
        </label>
      </div>
      <div>
        <label>
          Last name:
          <input type="text" name="lastname" defaultValue="Doe" />
        </label>
      </div>
      <div>
        <label>
          Date start:
          <input type="date" name="startdate" defaultValue="2022-08-31" />
        </label>
      </div>
      <div>
        <label>
          Date end:
          <input type="date" name="enddate" defaultValue="2022-09-03" />
        </label>
      </div>
      <div>
        <label>
          Number of adults:
          <input type="number" name="numberofadults" defaultValue="2" />
        </label>
      </div>
      <div>
        <label>
          Number of children:
          <input type="number" name="numberofchildren" defaultValue="2" />
        </label>
      </div>
      <div>
        <label>
          Flight Data:
          <input type="text" name="flightdata" defaultValue="helicopter" />
        </label>
      </div>
      <div>
        <label>
          Choose a car:
          <select name="cartype" id="cars">
            <option defaultValue="volvo">Volvo</option>
            <option defaultValue="saab">Saab</option>
            <option defaultValue="mercedes">Mercedes</option>
            <option defaultValue="audi">Audi</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Days in Kraków:
          <input type="number" name="daysincracow" defaultValue="2" />
        </label>
      </div>
      <div>
        <label>
          Days in Zakopane:
          <input type="number" name="daysinzakopane" defaultValue="2" />
        </label>
      </div>
      <div>
        <label>
          Days in Zakopane:
          <input
            type="text"
            name="hoteldata"
            defaultValue="Losowy hotel 123123"
          />
        </label>
      </div>

      <button name="actionType" value="getData">
        Get rows
      </button>
      <button name="actionType" value="addData">
        Add rows
      </button>
    </Form>
  );
}
