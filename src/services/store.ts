// import { rootReducer, burgerSlice } from "./rootReducer";
// import { applyMiddleware, createStore, compose, combineReducers } from "redux";
// import ThunkMiddleware from 'redux-thunk';
import burgerSlice from "./rootReducer";
import { configureStore } from '@reduxjs/toolkit'

// ручное создание комбинированного редуктора
// const combinedReducer = combineReducers({
//     // root: rootReducer,
//     slice: burgerSlice.reducer,
// })

// классический способ создания сторы с единым комбинированным редуктором
// const store = createStore(
//     combinedReducer,
//     applyMiddleware(
//         ThunkMiddleware
//     )
// );

// новый способ создания сторы. сразу принимает несколько редукторов, сама вызывает combineReducers
// сама применяет Middleware, Thunkmiddleware и инструменты разработчика
// работает только для одного уровня вложенности. Если больше слоеё вложенности редукторов, придется вызывать combineReducers самостоятельно
const store = configureStore({
    reducer: {
        // root: rootReducer,
        slice: burgerSlice,
    }
})

export default store;

// нужно для useDispatch, useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
