import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { DataView } from "./DataView";
import backendResponse from "../../public/backend-response.json";

const statistischesBundesamtData = backendResponse.find(
  (o) => o.department === "Statistisches Bundesamt"
)!;
const bmiData = backendResponse.find(
  (o) => o.department === "Bundesministerium des Innern"
)!;

jest.mock("@nivo/core", () => ({
  ...jest.requireActual("@nivo/core"),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ResponsiveWrapper: ({ children }: any) =>
    children({ width: 400, height: 400 }),
}));

test("Renders the visualization page with only ministries, hierarchy option", () => {
  act(() => {
    render(<DataView data={backendResponse} />);
  });
  const ministriesCheckbox = screen.getByTestId("only-ministries");
  const hierarchyCheckbox = screen.getByTestId("hierarchy");

  expect(ministriesCheckbox).toBeChecked();
  expect(hierarchyCheckbox).toBeChecked();

  const bmiLabel = screen.getByTestId(
    "parentLabel.Bundesministerium des Innern"
  );
  const expectedCount = bmiData.datasets + statistischesBundesamtData.datasets;
  expect(bmiLabel.textContent).toContain(expectedCount.toString());
});

test("Renders the visualization page with only ministries, but without hierarchy", () => {
  act(() => {
    render(<DataView data={backendResponse} />);
  });
  const ministriesCheckbox = screen.getByTestId("only-ministries");
  const hierarchyCheckbox = screen.getByTestId("hierarchy");

  expect(ministriesCheckbox).toBeChecked();
  expect(hierarchyCheckbox).toBeChecked();

  act(() => {
    fireEvent(
      hierarchyCheckbox,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  expect(hierarchyCheckbox).not.toBeChecked();

  const bmiLabel = screen.getByTestId("label.Bundesministerium des Innern");
  const expectedCount = bmiData.datasets;
  expect(bmiLabel.textContent).toContain(expectedCount.toString());
});
