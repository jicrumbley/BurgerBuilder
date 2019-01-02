import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>;
    });

    
    return (
        <>
            <h3>Your Order</h3>
            <p>Your made-to-order burger contains:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <strong>Total Price: {props.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</strong>
            <p>Continue to checkout?</p>
            <Button clicked={props.cancelClick} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.contClick} btnType='Success'>CONTINUE</Button>
        </>
    );
};

export default orderSummary;