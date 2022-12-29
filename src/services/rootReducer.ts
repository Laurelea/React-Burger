// import { IState, IAction, GETALL } from './types'
// import { IState } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient } from "../utils/types";

// классический способ создания редуктора
// const initialState: IState = {
//     allIngredients: [],
// }
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

// interface IOrder {
//     id: number;
//     contents: IIngredient[];
// }

export interface IState {
    allIngredients: IIngredient[];
    curIngredientsList: IIngredient[];
    curIngredient: IIngredient | {};
    curOrder: number | undefined;
    lastOrder: number;
}

// новый и самый оптимальный способ создания редуктора
const burgerSlice = createSlice({
    name: 'burger',
    initialState : {
        allIngredients: [],
        curIngredientsList: [],
        curIngredient: {} as IIngredient,
        curOrder: undefined,
        lastOrder: 0
    } as IState,
    reducers: {
        GETALL(state, action: PayloadAction<IIngredient[]>) {
            // state = {
            //     ...state,
            //     allIngredients: action.payload || state.allIngredients
            // }
            state.allIngredients = action.payload || state.allIngredients
        },
        ADD(state, action: PayloadAction<IIngredient>) {
            console.log('ADD', action.payload)
            if (action.payload.type === 'bun') {
                state.curIngredientsList = state.curIngredientsList.filter((i: IIngredient) => i.type != 'bun')
            }
            state.curIngredientsList.push(action.payload)
            state.curOrder = state.curOrder || state.lastOrder + 1
        },
        REMOVE(state, action: PayloadAction<string>) {
            const index = state.curIngredientsList.findIndex((i : IIngredient) => i._id === action.payload)
            console.log("REMOVE", action.payload, index)
            if (index !== -1) {
                state.curIngredientsList.splice(index, 1);
            }
        },
        SETCURI(state, action: PayloadAction<IIngredient>) {
            console.log('SETCURI', action.payload)
            state.curIngredient = action.payload || state.curIngredient
        },
        DELCURI(state) {
            console.log('DELCURI');
            state.curIngredient = {};
        }
    }
})

// новый способ, но не оптимальный (не протестировано)
// export const rootReducerT = createReducer(initialState, {
//     [testAction]: () => {
//         console.log('this is test action')
//     }
// })


// возвращалки значений для useSelector
export const selectCurOrder = (state: IState) => state.curOrder

// export default burgerSlice.reducer;
const { actions, reducer } = burgerSlice;
export const { GETALL, ADD, SETCURI, DELCURI, REMOVE }  = actions;
export default reducer;
