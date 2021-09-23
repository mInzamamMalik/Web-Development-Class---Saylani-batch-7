import React, { createContext, useReducer } from 'react'
import { reducer } from './../reducer/Reducer';

export const GlobalContext = createContext("Initial Value");
let data = {

  user: {
    userName: "Malik",
    email: "malik@sysborg.com",
    subject: "Computer Science"
  },
  darkTheme: true

}

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data)
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}
