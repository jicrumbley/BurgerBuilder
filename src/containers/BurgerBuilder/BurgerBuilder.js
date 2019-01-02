import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: .3,
    cheese: .7,
    meat: 1.3,
    bacon: .5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            bacon:0,
            salad:0,
            cheese:0,
            meat:1
        },
        totalPrice: 2.5,
        purchasing: false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: newIngredients, totalPrice: newPrice});

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        let newCount = oldCount;
        if(type === 'meat')
        {
            if(newCount > 1)
                newCount = newCount -1;
        }
        else
        {
            if(newCount > 0)
                newCount = newCount -1;
        }

        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients: newIngredients, totalPrice: newPrice});

    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing:false});
    }

    checkoutHandler = () => {
        console.log("checkout clicked")
    }

    render() {

        const disabledBtns = {...this.state.ingredients};
        for(let key in disabledBtns)
        {
            if(key === 'meat')
            {
                disabledBtns[key] = disabledBtns[key] <= 1;
            }
            else
            {
                disabledBtns[key] = disabledBtns[key] <= 0;
            }
        }

        return (
            <>
                <Modal show={this.state.purchasing} clickedBackdrop={this.cancelPurchaseHandler}>
                    <OrderSummary cancelClick={this.cancelPurchaseHandler} contClick={this.checkoutHandler} ingredients={this.state.ingredients} price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls price={this.state.totalPrice} added={this.addIngredientHandler} removed={this.removeIngredientHandler} disabled={disabledBtns} placeOrder={this.purchaseHandler} />
            </>
        );
    }
}

export default BurgerBuilder;