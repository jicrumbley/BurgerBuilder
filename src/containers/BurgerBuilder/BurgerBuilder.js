import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            bacon:0,
            salad:0,
            cheese:0,
            meat:1
        }
    }


    render() {
        return (
            <>
                <Burger ingredients={this.state.ingredients} />
                <div>Builder Controls</div>
            </>
        );
    }
}

export default BurgerBuilder;