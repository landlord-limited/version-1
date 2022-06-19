import React from 'react'
export const INITIAL_STATE = {
  isSidebarOpen: true,
}

export const contextReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      }
    default:
      return state
  }
}
