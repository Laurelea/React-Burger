export interface IIngredient {
    _id: string,
    __v: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    calories: number,
    carbohydrates: number,
    fat: number,
    type: 'bun' | 'main' | 'sauce',
    proteins: number,
};
