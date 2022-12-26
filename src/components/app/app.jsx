import { React, useEffect } from 'react';
import appStyles from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { AppHeader } from '../app-header/app-header';
import { connect } from "react-redux";
import { getAllIngredients } from "../../services/actions";
import { setAllIngredients } from "../../services/rootReducer"

const App = (props) => {
  console.log(11, props)
  useEffect(() => {
    props.getAllIngredients();
  }, [])

  return (
    <>
      <AppHeader />
      {props.allIngredients && props.allIngredients.length && (
        <main className={appStyles.mainGrid}>
          <BurgerIngredients data={props.allIngredients} />
          <BurgerConstructor data={props.allIngredients} />
        </main>
      )}
    </>
  );
}

export default connect(state => ({
    allIngredients: state.slice.allIngredients
}), { getAllIngredients })(App);
