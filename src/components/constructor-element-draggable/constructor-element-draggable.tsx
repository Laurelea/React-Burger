import React, { useEffect, useState, useRef } from 'react';
import type { FC } from 'react'
import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag, DropTargetMonitor } from 'react-dnd';
import styles from './constructor-element-draggable.module.css';
import { useDispatch } from 'react-redux';
// import { reorderConstructor } from '../../services/actions/ingr-in-constructor-actions';
import PropTypes from 'prop-types';
import { IIngredient, DragComponent } from "../../utils/types";
import { ItemTypes } from "../../services/types";
import stylesForBurgerConstructor from "../burger-constructor/burger-constructor.module.css";
import { ADD, REMOVE, REORDER } from "../../services/rootReducer";
import { useAppDispatch } from "../../services/hooks";

export interface IBCProps {
    ingredient: IIngredient,
    index: number,
    id: string
}

const BurgerComponent: FC<IBCProps> = (props) => {
    // console.log(18, props.index)
    // console.log(19, props.id)
    const dispatch = useAppDispatch()
    const moveCard = (dragIndex: number, hoverIndex: number) => {
        console.log("MOVE", dragIndex, hoverIndex);
        dispatch(REORDER({ dragIndex, hoverIndex }));
    }
    const ref = useRef<HTMLLIElement>(null)

    const [{ handlerId }, dropMove] = useDrop<
        DragComponent,
        void,
        { handlerId: string | symbol | null }
    >({
        accept: ItemTypes.COMPONENT,
        // drop: () => {
        //     console.log('DROPPED!')
        // },
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover: (item: DragComponent, monitor) => {
            if (!ref.current) {
                return
            }
            // console.log(43, item.index, item.id)
            const dragIndex = item.index
            const hoverIndex = props.index
            // console.log(46, dragIndex, hoverIndex)

            if (dragIndex === hoverIndex) {
                // console.log(54, dragIndex, hoverIndex)
                // console.log(57)
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)

            item.index = hoverIndex;
        }
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.COMPONENT,
        // item: props.ingredient,
        item: () => {
            return { id: props.id, index: props.index, type: ItemTypes.INGREDIENT }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item , monitor) => {
            const dropResult = monitor.getDropResult();
            console.log(86, dropResult)
            // console.log(87, item)
        },
    })

    drag(dropMove(ref))
    return (
        <li
            className={
                isDragging
                    ? `${styles.listItem} mb-4 ${styles.isDragging}`
                    : `${styles.listItem} mb-4`
            }
            style={{
                border: '2px solid pink',
            }}
            ref={ref}
            data-handler-id={handlerId}
        >
            <DragIcon type="primary"/>
            <ConstructorElement
                text={props.ingredient.name}
                price={props.ingredient.price}
                thumbnail={props.ingredient.image}
                handleClose={() => dispatch(REMOVE({ id: props.ingredient._id, type: props.ingredient.type }))}
            />
        </li>
    )
}

export default BurgerComponent
