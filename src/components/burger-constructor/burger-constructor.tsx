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

interface IBCProps {
    data: IIngredient[]
}

interface XYCoord {
    x: number;
    y: number;
}

const BurgerConstructor = (props: IBCProps) => {
    const dispatch = useAppDispatch()
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ItemTypes.INGREDIENT,
            drop: (ingredient: IIngredient) => dispatch(ADD(ingredient)),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        }),
        // [ingredient]
    )
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

    const [isOrderModalVis, setOrderModalVis] = useState(false);
    const closeOrderModal = () => setOrderModalVis(false);

    const bun = props.data.filter((i: IIngredient) => i.type === 'bun')[0]
    console.log(58, bun)

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
    const moveCard = () => (console.log("MOVE"))

    const BurgerComponent = (props: { key: number, ingredient: IIngredient }) => {
        const ref = useRef<HTMLLIElement>(null)

        const [{ isDragging }, dragComponent] = useDrag({
            type: ItemTypes.COMPONENT,
            item: props.ingredient,
            collect: (monitor: any) => ({
                isDragging: monitor.isDragging(),
            }),
        })
        // const [{ isCompOver }, dropComponent] = useDrop(
        const [{ handlerId }, dropComponent] = useDrop(
            () => ({
                accept: ItemTypes.INGREDIENT,
                // drop: (ingredient: IIngredient) => dispatch(ADD(ingredient)),
                // drop: () => {
                //     console.log('DROPPED!')
                // },
                // collect: (monitor) => ({
                //     isCompOver: !!monitor.isOver(),
                // }),
                collect(monitor) {
                    return {
                        handlerId: monitor.getHandlerId(),
                    }
                },
                hover: (item: IIngredient, monitor: any) => {
                    if (!ref.current) {
                        return
                    }
                    const dragId = item._id
                    const hoverId = props.ingredient._id

                    if (dragId === hoverId) {
                        return
                    }

                    const hoverBoundingRect = ref.current?.getBoundingClientRect()

                    // Get vertical middle
                    const hoverMiddleY =
                        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

                    // Determine mouse position
                    const clientOffset = monitor.getClientOffset()

                    // Get pixels to the top
                    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

                    // Only perform the move when the mouse has crossed half of the items height
                    // When dragging downwards, only move when the cursor is below 50%
                    // When dragging upwards, only move when the cursor is above 50%

                    // Dragging downwards
                    if (dragId < hoverId && hoverClientY < hoverMiddleY) {
                        return
                    }

                    // Dragging upwards
                    if (dragId > hoverId && hoverClientY > hoverMiddleY) {
                        return
                    }

                    // Time to actually perform the action
                    // moveCard(dragId, hoverId)
                    moveCard()

                    // Note: we're mutating the monitor item here!
                    // Generally it's better to avoid mutations,
                    // but it's good here for the sake of performance
                    // to avoid expensive index searches.
                    // item._id = hoverId
                }
            }),
            // [ingredient]
        )
        dragComponent(dropComponent(ref))
        return (
            <li
                className={`${stylesForBurgerConstructor.listItem} mb-4`}
                ref={ref}
            >
                <DragIcon type="primary"/>
                <ConstructorElement
                    text={props.ingredient.name}
                    price={props.ingredient.price}
                    thumbnail={props.ingredient.image}
                    handleClose={() => dispatch(REMOVE(props.ingredient._id))}
                />
            </li>
        )
    }
    // const ref = useRef<HTMLDivElement>(null)
    // dropComponent(drop(ref))

    return (
        <section
            className={`${stylesForBurgerConstructor.constructorSection} mt-25 ml-4 mr-4`}
            // ref={drop}
            // ref={dropComponent}
            // ref={(el)=> {dropOut(el); dropIn(el);}}
            // ref={ref}
            ref={drop}
            style={{
                border: isOver ? '2px solid red' : '',
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
            <ul className={`${stylesForBurgerConstructor.list}`}>
                {props.data.length ? props.data
                    .filter((i: IIngredient) => i.type != 'bun')
                    .map((ingredient:IIngredient, key: number) => (
                        <BurgerComponent key={key} ingredient={ingredient}/>
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
            <Modal isActive={isOrderModalVis} closeModal={closeOrderModal}>
                {/*<OrderDetails closeModal={closeOrderModal} />*/}
                <OrderDetails/>
            </Modal>
        </section>
    );
}

export default BurgerConstructor;
