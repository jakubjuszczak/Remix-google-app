import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { getRows, writeRows } from "~/utils/spreadsheets.server";

export const action = async ({ request }) => {
  const formData = await request.formData();
  //console.log(formData);
  const action = formData.get("actionType");
  if (action === "getData") {
    console.log("data === getData elo");
    await getRows();
  }
  if (action === "addData") {
    await writeRows();
  }

  return redirect("/");
};

export default function Index() {
  return (
    <Form method="POST">
      <button name="actionType" value="getData">
        Get rows
      </button>
      <button name="actionType" value="addData">
        Add rows
      </button>
    </Form>
  );
}
