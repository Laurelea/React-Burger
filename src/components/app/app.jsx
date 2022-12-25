import { React, useEffect, useState } from 'react';
import appStyles from './app.module.css';
import { URL_API } from '../../utils/constants';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { AppHeader } from '../app-header/app-header';
import { connect } from "react-redux";
import { getAllIngredients } from "../../services/actions";

const App = (props) => {
    console.log(11, props)
  // const [state, setState] = useState({
  //     ingredients: props.allIngredients || []
  // });
  useEffect(() => {
    props.getAllIngredients();
  }, [])
    // useEffect(() => {
  //   fetch(URL_API)
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(res.status);
  //     })
  //     .then((res) => setState({
  //         ...state,
  //         ingredients: res.data
  //     }))
  //     .catch((err) => console.error(err));
  // }, [])


  return (
    <>
      <AppHeader />
      {props.allIngredients.length && (
        <main className={appStyles.mainGrid}>
          <BurgerIngredients data={props.allIngredients} />
          <BurgerConstructor data={props.allIngredients} />
        </main>
      )}
    </>
  );
}

export default connect(state => ({
    allIngredients: state.allIngredients
}), { getAllIngredients })(App);
