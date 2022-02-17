import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import List from "./components/List";

describe("List component", () => {
  // use it to be more semantical
  it("should render list items", () => {
    const { getByText, rerender, queryByText } = render(
      <List initialItems={["Clara", "Marcos", "José"]} />
    );

    // epecting those 3 names to be in the document (got by text)
    expect(getByText("Clara")).toBeInTheDocument();
    expect(getByText("Marcos")).toBeInTheDocument();
    expect(getByText("José")).toBeInTheDocument();

    // TODO: Try to use rerender in the same test case
    // // rerendering same component using rerender method
    // rerender(<List initialItems={["Julia"]} />);

    // // expecting that new initial item be in document, and previous render item not
    // expect(getByText("Julia")).toBeInTheDocument();
    // expect(queryByText("Clara")).not.toBeInTheDocument();
  });

  it("should be able to add new item to list", async () => {
    const { getByText, getByPlaceholderText, findByText, debug } = render(
      <List initialItems={[]} />
    );

    // getting input by placeholder
    const inputElement = getByPlaceholderText("Novo item");
    // getting button by text
    const addButton = getByText("Adicionar");

    // use debug to console the actual component state
    // debug();

    // use to type some text on input
    userEvent.type(inputElement, "Cleiton");
    // use to press button
    userEvent.click(addButton);

    // expect typed text to be instantly in list
    // expect(getByText("Cleiton")).toBeInTheDocument();

    // expect typed text to be in list (waiting to appears as in a api call) using async await
    expect(await findByText("Cleiton")).toBeInTheDocument();

    // expect typed text to be in list exactly as previous expect, but using waitFor
    await waitFor(() => {
      expect(getByText("Cleiton")).toBeInTheDocument();
    });
  });
});

it("should be able to remove item from list", async () => {
  const { getByText, getAllByText, queryByText } = render(
    <List initialItems={["Clara"]} />
  );

  // getting button by text
  const removeButtons = getAllByText("Remover");

  // use to press first and second remove buttons
  userEvent.click(removeButtons[0]);

  // expect first item from list to be removed on click in the first remove button
  await waitForElementToBeRemoved(() => {
    // return element removed (first name from list)
    return getByText("Clara");
  });

  // could be used as waitForElementToBeRemoved, but using only waitFor and passing .not. before toBeInTheDocument()
  await waitFor(() => {
    // Use queryByText to find or not the element (It shouldn't be found in doc)
    expect(queryByText("Clara")).not.toBeInTheDocument();
  });
});

// test work as it (but it is semantically better in my opinion)
test("finding text on DOM", () => {
  const { getByText } = render(<List initialItems={[]} />);

  // getting by text hello World and expecting to exist
  expect(getByText("Hello world")).toBeInTheDocument();

  // getting Hello world and expecting to have className 'test'
  expect(getByText("Hello world")).toHaveAttribute("class", "test");
});
