import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: .3,
    cheese: .7,
    meat: 1.3,
    bacon: .5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 2.5,
        purchasing: false,
        loading: false,
        error:false
    }

    componentDidMount = () => {
        axios.get('https://react-burger-backend-1.firebaseio.com/ingredients.json')
        .then(res => {
            this.setState({ingredients: res.data});
        }).catch(error => {
            this.setState({error:true})
        });
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
        //console.log("checkout clicked")
        
        const queryParams = [];
        for(let i in this.state.ingredients)
        {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
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

        let orderSum = null;
        let burger = this.state.error ? <p>Unable to load ingredients from server</p> : <Spinner />
        if(this.state.ingredients)
        {
            burger = 
            <>    
                <Burger ingredients={this.state.ingredients} />
                <BuildControls price={this.state.totalPrice} added={this.addIngredientHandler} removed={this.removeIngredientHandler} disabled={disabledBtns} placeOrder={this.purchaseHandler} />
            </>;
            orderSum = <OrderSummary cancelClick={this.cancelPurchaseHandler} contClick={this.checkoutHandler} ingredients={this.state.ingredients} price={this.state.totalPrice} />;

        }

        if(this.state.loading)
        {
            orderSum = <Spinner />
        }

        return (
            <>
                <Modal show={this.state.purchasing} clickedBackdrop={this.cancelPurchaseHandler}>
                    {orderSum}
                </Modal>
                {burger}
            </>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);