import { URL_API } from "../utils/constants";
import { Dispatch } from 'redux'
import {
    GETALL,
} from "./types";
import { setAllIngredients } from "./rootReducer"
import { createAction } from "@reduxjs/toolkit";

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
        // dispatch(({
        //     type: GETALL,
        //     payload: res.data
        // }));
        dispatch(setAllIngredients(res.data));
    })
    .catch((err) => console.error(err));
}

// export const getAllIngredients = createAction("GETALL")

// const getAllIngredients = counterSlice(
//     { value: 10 },
//     setAllIngredients()
// )
