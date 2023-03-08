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
import { useAppDispatch } from '../../services/hooks'
import { ADD, REMOVE } from "../../services/rootReducer";
import BurgerComponent from "../constructor-element-draggable/constructor-element-draggable";

interface IBCProps {
    data: IIngredient[]
}

const BurgerConstructor = (props: IBCProps) => {
    const dispatch = useAppDispatch()
    // const closeOrderModal = () => setOrderModalVis(false);

    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.INGREDIENT,
        drop: (ingredient: IIngredient) => dispatch(ADD(ingredient)),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    })

    // const [{ isCompOver }, dropComponent] = useDrop(
    //     () => ({
    //         accept: ItemTypes.INGREDIENT,
    //         // drop: (ingredient: IIngredient) => dispatch(ADD(ingredient)),
    //         drop: () => {
    //             console.log('DROPPED!')
    //         },
    //         collect: (monitor) => ({
    //             isCompOver: !!monitor.isOver(),
    //         }),
    //     }),
    //     // [ingredient]
    // )

    // const [isOrderModalVis, setOrderModalVis] = useState(false);

    const bun = props.data.filter((i: IIngredient) => i.type === 'bun')[0]
    const orderSum = props.data
        .filter((i: IIngredient) => i.type != 'bun')
        .reduce((sum: number, i: IIngredient) => {
            sum += i.price;
            return sum
        }, 0) + (bun && bun.price || 0) * 2

    // const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    //     setCards((prevCards: Item[]) =>
    //         update(prevCards, {
    //             $splice: [
    //                 [dragIndex, 1],
    //                 [hoverIndex, 0, prevCards[dragIndex] as Item],
    //             ],
    //         }),
    //     )
    // }, [])

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
                        handleClose={() => dispatch(REMOVE(bun._id))}
                    />
                </div>}
            <ul className={`${stylesForBurgerConstructor.list}`} style={{
                    border: '2px solid blue'}}>
                {props.data.length ? props.data
                    .filter((i: IIngredient) => i.type != 'bun')
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
                        handleClose={() => dispatch(REMOVE(bun._id))}
                    />
                </div>}
            {/*<div className={`${stylesForBurgerConstructor.checkWrapper} mt-10`}>*/}
            {/*    <div className={`${stylesForBurgerConstructor.checkSummary}`}>*/}
            {/*        <p className={`text text_type_digits-medium mr-2`}>{orderSum}</p>*/}
            {/*        <CurrencyIcon type="primary"/>*/}
            {/*        <span className={`text text_type_digits-medium ml-10`}></span>*/}
            {/*        <Button*/}
            {/*            htmlType="button"*/}
            {/*            type="primary"*/}
            {/*            size="large"*/}
            {/*            onClick={() => {*/}
            {/*                setOrderModalVis(true);*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            Оформить заказ*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<Modal isActive={isOrderModalVis} closeModal={closeOrderModal}>*/}
            {/*    /!*<OrderDetails closeModal={closeOrderModal} />*!/*/}
            {/*    <OrderDetails/>*/}
            {/*</Modal>*/}
        </section>
    );
}

export default BurgerConstructor;
