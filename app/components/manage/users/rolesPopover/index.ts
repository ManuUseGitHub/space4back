export const getRoleSeverity = (role: string) => {
  let result = "primary";
  switch (role) {
    case "admin":
      result = "secondary";
      break;
    case "superadmin":
      result = "danger";
  }
  return result;
};