import React from "react";
import Register from "../../src/components/Register";

/* Plan for testing Register component
    *

    test: captures change input and passes it event handler
    test: sets form state on change input
    test: captures reset password input and passes it to handler
    test: sets reset state on change input
    test: sets submitted state on submit
    test: checks passwords match
    test: posts register data on submit
    test: sets loading state on response
    
    *
 */

describe("Register", () => {
  // Declare variables to hold on to values for each test case
  let wrapper;
  let mockReceiveRegisterState;

  // recreate wrapper before each test case
  beforeEach(() => {
    mockReceiveRegisterState = jest.fn();
    wrapper = shallow(
      <Register receiveRegisterState={mockReceiveRegisterState} />
    );
  });

  // remove wrapper after each test case
  afterEach(() => {
    wrapper = null;
  });

  // run test cases
  test("shallow wrapper instance should be null in stateless component", () => {
    const instance = wrapper.instance();
    expect(instance).to.equal(null);
  });
});
