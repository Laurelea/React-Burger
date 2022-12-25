export const GETALL = 'GETALL'

export interface IState {
    counter: number;
    allIngredients: any[],
}

// interface IIngredients {
//
// }

export interface IGetAllI{
    type: typeof GETALL;
    payload: any[];
}

export type IAction = IGetAllI
