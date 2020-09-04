import React from "react";
import Register from "../../src/components/Register";
import useFormFields from "../../src/hooks/useFormFields";

// pass custom hook as a prop, using HookWrapper component to render
// this means we can access hook on props object
function HookWrapper(props) {
  const hook = props.hook ? props.hook() : undefined;
  return <div hook={hook} />;
}

describe("useFormFields", () => {
  // Declare variables to hold on to values for each test case
  let wrapper;
  let mockFormFields;

  // recreate wrapper before each test case
  beforeEach(() => {
    mockFormFields = { email: "", password: "" };
    wrapper = shallow(
      <HookWrapper
        hook={() => {
          useFormFields(mockFormFields);
        }}
      />
    );
  });

  // remove wrapper after each test case
  afterEach(() => {
    wrapper = null;
  });

  // run test cases

  test("useFormFields renders", () => {
    expect(wrapper.exists().toBeTruthy);
  });

  test("sets initial form field values", () => {
    //.props() return values for props
    let { hook } = wrapper.find("div").props();
    let [form, handleChange, resetForm, repeatP, handleRepeatPassword] = hook;
    expect(form).toEqual(mockFormFields);

    wrapper = shallow(<HookWrapper hook={() => useFormField("marco")} />);
    // destructuring objects - {} should be inside brackets - () to avoid syntax error
    ({ hook } = wrapper.find("div").props());
    [form, handleChange, resetForm, repeatP, handleRepeatPassword] = hook;
    expect(val).toEqual("marco");
  });
});
