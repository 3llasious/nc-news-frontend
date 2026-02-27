import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "jessjelly",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
  });

  return (
    <LoginContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </LoginContext.Provider>
    //created the context components on line 3
  );
};
