import React, { createContext, useReducer, useContext } from 'react'

const StateCtx = createContext()
const DispatchCtx = createContext()

const initialState = {
  patients: [],
  loading: false,
  error: null,
  query: '',
  selected: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null }
    case 'SET_PATIENTS':
      return { ...state, patients: action.payload, loading: false }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_QUERY':
      return { ...state, query: action.payload }
    case 'SET_SELECTED':
      return { ...state, selected: action.payload }
    case 'CLEAR_SELECTED':
      return { ...state, selected: null }
    case 'ADD_PATIENT':
      return { ...state, patients: [action.payload, ...state.patients] }
    default:
      return state
  }
}

export const PatientProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>
        {children}
      </DispatchCtx.Provider>
    </StateCtx.Provider>
  )
}

export const usePatientState = () => useContext(StateCtx)
export const usePatientDispatch = () => useContext(DispatchCtx)
