# All the people

##User directory with login

To run the project, npm install and run locally.

Dev mode - npm run start:dev

Visit localhost:8080

---

A few notes:

- Delete from array does not call the API - deletes locally
- An added user has a different type model to other users - but has required key:values for output
- Testing API only - would need to persist array (local storage) so don't lose added user on paging/refresh
- Further work to be done on form validation - e.g. regex for email and passwords
- Need to add React Router + 404

---

TODO: PropTypes checking in components

TODO: TESTS (Jest)
A few examples of testing to be done:

Snapshot tests on components

LOGIN, REGISTER, ADD USER FORMS

- should set form states on change inputs
- should set submitted states on submit form
- should change button text and disabled by changing loading state
- should not submit form if values invalid
- should set isRegistered / isLoggedIn state if success is set true
- should check passwords match on register form
- should dispatch post requests

Conditional rendering

- should render Register if isRegistered state false
- should render Login notice if isRegistered state true
- should render Login if isLogin state false
- should render Users, AddUser and Paging if isLoggedIn state true

Test add and delete methods
