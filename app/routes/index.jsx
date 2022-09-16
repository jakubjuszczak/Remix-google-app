import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getRows, writeRows, getCarTypes } from "~/utils/spreadsheets.server";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get("actionType");
  if (action === "getData") {
    await getRows();
  }
  if (action === "addData") {
    const data = {};
    // TODO: fix dynamic data
    // now it only shows the last row, but should display
    // a list of all these fields
    // remove 'program' and 'date' fields, replace with a list
    formData.forEach((value, key) => (data[key] = value));
    await writeRows(data);
  }

  return redirect("/");
};

export const loader = async () => {
  console.log("loader fired off");
  return await getCarTypes();
};

export default function Index() {
  // TODO: dynamic fields
  const [programPlanList, setProgramPlanList] = useState([
    { date: "", program: "" },
  ]);
  const initialSelectOptionsList = useLoaderData();
  const [selectOptionsList, setSelectOptionsList] = useState(
    initialSelectOptionsList
  );

  const handleProgramPlanChange = (index, event) => {
    const data = [...programPlanList];
    data[index][event.target.name] = event.target.value;
    setProgramPlanList(data);

    console.log(programPlanList);
  };

  const addProgramFields = () => {
    const newfield = { date: "", program: "" };
    setProgramPlanList([...programPlanList, newfield]);
  };

  const removeProgramFields = (index) => {
    let data = [...programPlanList];
    data.splice(index, 1);
    setProgramPlanList(data);
  };

  const handlePAXChange = (event) => {
    setSelectOptionsList(
      initialSelectOptionsList.filter(
        (car) => car.capacity >= event.currentTarget.value
      )
    );
  };
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
          <input
            type="number"
            name="numberofadults"
            defaultValue="2"
            onChange={(e) => handlePAXChange(e)}
          />
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
          Car type:
          <select name="cartype" id="cars">
            {selectOptionsList.map((car) => {
              return (
                <option key={car.type} value={car.capacity}>
                  {car.type}
                </option>
              );
            })}
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
      <hr />
      Dyanmic data
      {programPlanList.map((input, index) => {
        return (
          <div key={index}>
            <input
              name="date"
              type="date"
              placeholder="03-03-2022"
              value={input.date}
              autoComplete="off"
              onChange={(event) => handleProgramPlanChange(index, event)}
            />
            <input
              name="program"
              type="text"
              placeholder="Program plan placeholder"
              value={input.program}
              autoComplete="off"
              onChange={(event) => handleProgramPlanChange(index, event)}
            />
            <button onClick={() => removeProgramFields(index)}>Remove</button>
          </div>
        );
      })}
      <button onClick={addProgramFields}>Add More..</button>
      <hr />
      <button name="actionType" value="getData">
        Get rows
      </button>
      <button name="actionType" value="addData">
        Add rows
      </button>
    </Form>
  );
}
