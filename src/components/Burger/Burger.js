import React from 'react';
import classes from './Burger.css';
import Ingredient from './Ingredients/Ingredient';

const burger = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map( (_, i) => {
                return <Ingredient key={igKey + i} type={igKey} />
            });
        }).reduce( (arr,el) => {
            return arr.concat(el);
        }, []);
    console.log(ingredients);
    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
            {ingredients}
            <Ingredient type="bread-bottom" />
        </div>
    );
};

export default burger;