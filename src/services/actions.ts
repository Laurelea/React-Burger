import { URL_API } from "../utils/constants";
import { Dispatch } from 'redux'
import { GETALL, SETCURI } from "./rootReducer"
import { createAction } from "@reduxjs/toolkit";

// импорт для классического редуктора
// import {
//     GETALL,
// } from "./types";

export const getAllIngredients = () => (dispatch: Dispatch) => {
    fetch(URL_API)
    .then((res) => {
        // console.log(10, res);
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .then((res) => {
        console.log(21, res)
        // способ диспатча для классического редуктора
        // dispatch(({
        //     type: GETALL,
        //     payload: res.data
        // }));
        dispatch(GETALL(res.data));
    })
    .catch((err) => console.error(err));
}

// какой-то новый, но не оптимальный способ
export const setCurI = createAction("SETCURI")

// тоже какой-то неоптимальный способ
// const getAllIngredients = counterSlice(
//     { value: 10 },
//     setAllIngredients()
// )
