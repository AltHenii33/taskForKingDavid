import React, { createContext, useReducer, useEffect } from 'react'
import { format } from 'date-fns';
import lscache from "lscache";

const defaultState = {
  data1: format(new Date(), `yyyy-MM-dd'T'HH:mm`),
  data2: format(new Date(), `yyyy-MM-dd'T'HH:mm`),
  location: {
    lat: 50.449218,
    lng: 30.525824
  }
}

const initialState = lscache.get('state') ? lscache.get('state') : defaultState;

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA_1': {
      return {
        ...state,
        data1: action.payload
      }
    }

    case 'SET_DATA_2':
      return {
        ...state,
        data2: action.payload
      }
    case 'SET_LOCATION': {
      return {
        ...state,
        location: action.payload
      }
    }
    default:
      return state
  }
}

export const CurrentUserContext = createContext()

export const CurrentUserProvider = ({ children }) => {
  let [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    function saveStateToLocalStorage() {
      lscache.set('state', state)
    },
    [state]
  );

  const updateStateFromLocalStorage = () => {
    const newState = lscache.get('state') ? lscache.get('state') : defaultState;
    dispatch({ type: "updatefromlocalstorage", newState });
  };

  useEffect(function watchForChanges() {
    window.addEventListener("storage", updateStateFromLocalStorage);
    return () => {
      window.removeEventListener("storage", updateStateFromLocalStorage);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={[state, dispatch]}>
      {children}
    </CurrentUserContext.Provider>
  )
}