// import { createContext, useState } from "react";

// export const UserContext = createContext();

// export const UserContextProvider = props => {
//     const [user, setUser] = useState();
//     return (
//         <UserContext.Provider value={{user, setUser}}>
//             {props.children}
//         </UserContext.Provider>
//     )
// }

import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
