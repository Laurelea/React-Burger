import rootReducer from "./rootReducer";
import { applyMiddleware, createStore, compose } from "redux";
import ThunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import sliceReducer from "./sliceReducer";

const store = createStore(
    rootReducer,
    applyMiddleware(
        ThunkMiddleware
    )
);

// const store = configureStore({
//     reducer: {
//         burger: sliceReducer,
//     }
// })

export default store;

