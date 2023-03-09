import React, { useEffect, useState, useRef } from 'react';
import { IIngredient } from '../../utils/types';
import {
    ConstructorElement,
    DragIcon,
    CurrencyIcon,
    Counter,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForBurgerConstructor from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../services/types";
import { useAppDispatch } from '../../services/hooks';
import { useSelector } from 'react-redux';
import { ADD, REMOVE } from "../../services/rootReducer";
import BurgerComponent from "../constructor-element-draggable/constructor-element-draggable";

interface IBCProps {
    curIngredientsList: IIngredient[],
    bun: IIngredient | null,
}

const BurgerConstructor = (props: IBCProps) => {
    console.log(26, props)
    const dispatch = useAppDispatch()
    const closeOrderModal = () => setOrderModalVis(false);

    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.INGREDIENT,
        drop: (ingredient: IIngredient) => dispatch(ADD(ingredient)),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    })

    const [isOrderModalVis, setOrderModalVis] = useState(false);
    // const orderNumber = useSelector((store: any) => store.order.order);


    // const bun = props.curIngredientsList.filter((i: IIngredient) => i.type === 'bun')[0]
    const bun = props.bun;
    // .filter((i: IIngredient) => i.type != 'bun')
    const orderSum = props.curIngredientsList ? props.curIngredientsList
        .reduce((sum: number, i: IIngredient) => {
            sum += i.price;
            return sum
        }, 0) + (bun && bun.price || 0) * 2 : 0



    return (
        <section
            className={`${stylesForBurgerConstructor.constructorSection} mt-25 ml-4 mr-4`}
            ref={dropRef}
            style={{
                border: isOver ? '2px solid red': '',
            }}
        >
            {bun &&
                <div
                    className={`${stylesForBurgerConstructor.listItem} mb-4`}
                    >
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                        handleClose={() => dispatch(REMOVE({ id: bun._id, type: 'bun' }))}
                    />
                </div>}
            <ul className={`${stylesForBurgerConstructor.list}`} style={{
                    border: '2px solid blue'}}>
                {props.curIngredientsList.length ? props.curIngredientsList
                    // .filter((i: IIngredient) => i.type != 'bun')
                    .map((ingredient:IIngredient, index: number) => (
                        <BurgerComponent
                            key={ingredient._id + index.toString()}
                            ingredient={ingredient}
                            index={index}
                            id={ingredient._id + index.toString()}
                        />
                    )) : null}
            </ul>
            {bun &&
                <div
                    className={`${stylesForBurgerConstructor.listItem} mb-4`}
                >
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                        handleClose={() => dispatch(REMOVE({ id: bun._id, type: 'bun' }))}
                    />
                </div>}
            <div className={`${stylesForBurgerConstructor.checkWrapper} mt-10`}>
                <div className={`${stylesForBurgerConstructor.checkSummary}`}>
                    <p className={`text text_type_digits-medium mr-2`}>{orderSum}</p>
                    <CurrencyIcon type="primary"/>
                    <span className={`text text_type_digits-medium ml-10`}></span>
                    <Button
                        htmlType="button"
                        type="primary"
                        size="large"
                        onClick={() => {
                            setOrderModalVis(true);
                        }}
                    >
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {/*<Modal closeModal={closeOrderModal}>*/}
                {/*<OrderDetails orderNumber={orderNumber}  />*/}
            {/*</Modal>*/}
        </section>
    );
}

export default BurgerConstructor;
