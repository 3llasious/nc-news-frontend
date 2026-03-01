import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <LoginContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </LoginContext.Provider>
    //created the context components on line 3
  );
};
