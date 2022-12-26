import { IState, IAction, GETALL } from './types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IState = {
    counter: 0,
    allIngredients: [],
}

// export const rootReducer = (state: IState = initialState, action: IAction) => {
//     switch (action.type) {
//         case GETALL:
//             console.log('get all ingredients:', action.payload)
//             return {
//                 ...state,
//                 allIngredients: action.payload || state.allIngredients
//             }
//         default: return state
//     }
// }

export const burgerSlice = createSlice({
    name: 'burger',
    initialState: {
        allIngredients: [],
    },
    reducers: {
        setAllIngredients(state, action) {
            console.log(28, action.payload)
            // state = {
            //     ...state,
            //     allIngredients: action.payload || state.allIngredients
            // }
            state.allIngredients = action.payload || state.allIngredients
        }
    }
})

// export const rootReducerT = createReducer(initialState, {
//     [testAction]: () => {
//         console.log('this is test action')
//     }
// })

// export default burgerSlice.reducer;

export const { setAllIngredients }  = burgerSlice.actions
