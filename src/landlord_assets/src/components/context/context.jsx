import React, { createContext, useContext, useReducer } from 'react'
import { INITIAL_STATE, contextReducer } from './contextReducer'

export const ProviderContext = createContext()

const AppActions = () => {
  const [state, dispatch] = useReducer(contextReducer, INITIAL_STATE)

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }

  return {
    state,
    toggleSidebar,
  }
}

const Provider = ({ children }) => {
  const { state, ...restProps } = AppActions()

  const value = {
    isSidebarOpen: state.isSidebarOpen,
    ...restProps,
  }

  return <ProviderContext.Provider value={value}>{children}</ProviderContext.Provider>
}
const usePropertyContext = () => {
  const context = useContext(ProviderContext)
  return context
}

export { Provider, usePropertyContext }
