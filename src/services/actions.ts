import {URL_API} from "../utils/constants";
import counterSlice from './sliceReducer'
import setAllIngredients from './sliceReducer'
import { Dispatch } from 'redux'
import {
    GETALL,
} from "./types";

export const getAllIngredients = () => (dispatch: Dispatch) => {
    fetch(URL_API)
    .then((res) => {
        console.log(10, res);
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
    .then((res) => {
        console.log(21, res)
        dispatch(({
            type: GETALL,
            payload: res.data
        }));
    })
    .catch((err) => console.error(err));
}

// export const getAllIngredients = () => {
//     fetch(URL_API)
//         .then((res) => {
//             console.log(10, res);
//             if (res.ok) {
//                 return res.json();
//             }
//             return Promise.reject(res.status);
//         })
//         .then((res) => (res.data))
//         .catch((err) => console.error(err));
//     // return {
//     //     type: UNAUTHORIZE
//     //     payload:
//     // }
// }

// const getAllIngredients = counterSlice(
//     { value: 10 },
//     setAllIngredients()
// )
