import React, {useEffect, useState} from 'react';
// import PropTypes from 'prop-types';
// import { typeOfingredient } from '../../utils/propTypes.js';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForBurgeringredients from './burger-ingredients.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import { IIngredient } from "../../utils/types";
import { useAppSelector, useAppDispatch } from '../../services/hooks'
import { SETCURI, DELCURI, ADD } from "../../services/rootReducer";

interface IBIsProps {
    data: IIngredient[]
}

const BurgerIngredients = (props: IBIsProps) => {
    // console.log(11, props);
    // console.log(12, props.data.filter(i => i.type === 'bun'));
    const [current, setCurrent] = useState('bun');

    const [isModalIngredientOpen, setModalIngredientOpen] = useState(false);

    const [selectedIngredient, setSelectedIngredient] = useState({});

    const dispatch = useAppDispatch();

    const openModalIngredient = (item: IIngredient) => {
        setSelectedIngredient(item);
        setModalIngredientOpen(true);
        dispatch(SETCURI(item));
        // dispatch(ADD(item));
    };

    const closeModalIngredient = () => {
        setModalIngredientOpen(false);
        dispatch(DELCURI())
    };

    return (
        <section>
            <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
            <div className={`${stylesForBurgeringredients.tabs}`}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <ul className={stylesForBurgeringredients.ingredientsList}>
                {current === 'bun' && (
                    <li>
                        <h3
                            className={`${stylesForBurgeringredients.typeHeader} text text_type_main-medium`}
                        >
                            Булки
                        </h3>
                        <ul className={stylesForBurgeringredients.ingredientsByType}>
                            {props.data
                                .filter((data) => data.type === 'bun')
                                .map((ingredient) => (
                                    <li key={ingredient._id}>
                                        <BurgerIngredient
                                            data={ingredient}
                                            openModalIngredient={openModalIngredient}
                                            // id={ingredient._id}
                                        />
                                    </li>
                                ))}
                        </ul>
                    </li>
                )}
                {current === 'sauce' && (
                    <li>
                        <h3
                            className={`${stylesForBurgeringredients.typeHeader} text text_type_main-medium`}
                        >
                            Соусы
                        </h3>
                        <ul className={stylesForBurgeringredients.ingredientsByType}>
                            {props.data
                                .filter((data) => data.type === 'sauce')
                                .map((ingredient) => (
                                    <li key={ingredient._id}>
                                        <BurgerIngredient
                                            data={ingredient}
                                            openModalIngredient={openModalIngredient}
                                        />
                                    </li>
                                ))}
                        </ul>
                    </li>
                )}
                {current === 'main' && (
                    <li>
                        <h3
                            className={`${stylesForBurgeringredients.typeHeader} text text_type_main-medium`}
                        >
                            Начинки
                        </h3>
                        <ul className={stylesForBurgeringredients.ingredientsByType}>
                            {props.data
                                .filter((data) => data.type === 'main')
                                .map((ingredient) => (
                                    <li key={ingredient._id}>
                                        <BurgerIngredient
                                            data={ingredient}
                                            openModalIngredient={openModalIngredient}
                                        />
                                    </li>
                                ))}
                        </ul>
                    </li>
                )}
            </ul>
            <Modal closeModal={closeModalIngredient}>
                <IngredientDetails data={selectedIngredient}/>
            </Modal>
        </section>
    );
}

// BurgerIngredients.propTypes = {
//   data: PropTypes.arrayOf(typeOfingredient).isRequired,
// };

export default BurgerIngredients;
