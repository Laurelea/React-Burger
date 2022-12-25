// import { someAction } from "./actions";
import { IState, IAction, GETALL } from './types'

const initialState: IState = {
    counter: 0,
    allIngredients: [],
}

const rootReducer = (state: IState = initialState, action: IAction) => {
    switch (action.type) {
        case GETALL:
            console.log('get all ingredients:', action.payload)
            return {
                ...state,
                allIngredients: action.payload || state.allIngredients
            }
        default: return state
    }
}

export default rootReducer;
