import React from 'react';

import classes from './BuildControls.css';
import Control from './Control/Control';

const controls = [  
    { label: 'Bacon', type: 'bacon'},
    { label: 'Salad', type: 'salad'},
    { label: 'Cheese', type: 'cheese'}, 
    { label: 'Meat', type: 'meat'} 
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <strong>Total Price: {props.price.toLocaleString('en-US', {style:'currency', currency:'USD'})}</strong>
        {controls.map(ctrl => (
            <Control key={ctrl.label} label={ctrl.label} added={() => props.added(ctrl.type) } removed={() => props.removed(ctrl.type)} disabled={props.disabled[ctrl.type]} />
        ))}
        <button className={classes.OrderButton} onClick={props.placeOrder}>PLACE ORDER</button>
    </div>
);

export default buildControls;