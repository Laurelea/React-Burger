// import { rootReducer, rootReducerT } from "./rootReducer";
// import { rootReducer, burgerSlice } from "./rootReducer";
import { burgerSlice } from "./rootReducer";
import { applyMiddleware, createStore, compose, combineReducers } from "redux";
import ThunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'

const combinedReducer = combineReducers({
    // root: rootReducer,
    slice: burgerSlice.reducer,
})

// const store = createStore(
//     combinedReducer,
//     applyMiddleware(
//         ThunkMiddleware
//     )
// );

const store = configureStore({
    reducer: combinedReducer
})

export default store;

