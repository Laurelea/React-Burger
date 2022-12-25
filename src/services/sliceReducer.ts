import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
    name: 'burger',
    initialState: {
        counter: 0,
        allIngredients: [],
    },
    reducers: {
        setAllIngredients(state, action) {
            state = {
                ...state,
                allIngredients: action.payload.ingredients
            }
        }
        // todoAdded(state, action) {
        //     state.push({
        //         id: action.payload.id,
        //         text: action.payload.text,
        //         completed: false
        //     })
        // },
        // todoToggled(state, action) {
        //     const todo = state.find(todo => todo.id === action.payload)
        //     todo.completed = !todo.completed
        // }
    }
})

export const { setAllIngredients } = todosSlice.actions
export default todosSlice.reducer
