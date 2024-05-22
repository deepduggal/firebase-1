import React, { createContext } from 'react';

// type Session = {

// };

// Create the session context
const SessionContext = createContext({
  session: {user: null},
  setSession: (session) => {throw Error('setSession() initial value (from SessionContext) not overwritten yet.')},
});

export default SessionContext;