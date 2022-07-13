
export const formUser = () => {
  return [
    { name: "userFullName", label: "FULL_NAME", require: true, type: "string" },
    { name: "userEmail", label: "Email", require: true, type: "email" },
    {
      name: "userPhoneNumber", label: "PHONE", require: true, type: "string",
      pattern: new RegExp( /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/ )
    },
    { name: "userName", label: "USER_NAME", require: true, type: "string" },
    { name: "userPassword", label: "PASS", require: true, type: "string" },
    { name: "roleId", label: "ROLE", require: true, type: "string" },
    { name: "userStatus", label: "STATUS_USER", require: true, type: "number" },
  ];
};
