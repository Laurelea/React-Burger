import React, {useEffect, useState} from 'react';
import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForBurgeringredient from './burger-ingredient.module.css';
import { IIngredient } from "../../utils/types";
import { useDrag } from 'react-dnd'
import { ItemTypes } from "../../services/types";
import { useAppSelector } from "../../services/hooks";
import {IState} from "../../services/rootReducer";


interface IBIProps {
    data: IIngredient,
    openModalIngredient: (data: IIngredient) => void,
    id?: string,
}

const BurgerIngredient = (props: IBIProps) => {
    const getCounter = (state: { slice: IState }, id: string) => {
        return state.slice.curIngredientsList.filter((i: IIngredient) => i._id === id).length
    }

    const counter = useAppSelector((state: { slice: IState }) => getCounter(state, props.data._id));

    const [{ isDragging }, dragRef] = useDrag({
        type: ItemTypes.INGREDIENT,
        item: props.data,
        end: (item , monitor) => {
            const dropResult = monitor.getDropResult();
            console.log(32, dropResult)
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <div
            ref={dragRef}
            style={{
              opacity: isDragging ? 0.5 : 1,
            }}
            draggable
            className={`${stylesForBurgeringredient.ingredientWrap}`}
            id={props.data._id}
            onClick={() => props.openModalIngredient(props.data)}
        >
            {counter > 0 && <Counter count={counter} size="default" extraClass="m-1"/>}
            <img
                className={`pr-4 pl-4`}
                src={props.data.image}
                alt={props.data.name}
            />
            <div
                className={`${stylesForBurgeringredient.ingredientPriceWrap} pt-1 pb-1`}
            >
                <p className={'text text_type_digits-default'}>{props.data.price}</p>
                <CurrencyIcon type={'primary'}/>
            </div>
            <p className={'text text_type_main-default'}>{props.data.name}</p>
        </div>
    );
}

// BurgerIngredient.propTypes = {
//   data: typeOfingredient.isRequired,
// };

export default BurgerIngredient;
