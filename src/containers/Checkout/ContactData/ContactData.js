import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name:{
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required:true
                },
                valid:false,
                touched: false
            },
            street: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation: {
                    required:true
                },
                valid:false,
                touched: false
            },
            city: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your city'
                },
                value: '',
                validation: {
                    required:true
                },
                valid:false,
                touched: false
            },
            zip: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zip code'
                },
                value: '',
                validation: {
                    required:true,
                    minLength: 5,
                    maxLength: 5
                },
                valid:false,
                touched: false
            },
            country: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: '',
                validation: {
                    required:true
                },
                valid:false,
                touched: false
            },
            email: {
                elementType:'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required:true
                },
                valid:false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue:'Fastest'},
                        {value: 'regular', displayValue:'Regular'},
                        {value: 'slowest', displayValue:'Cheapest'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading:false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const formData = {};

        for(let element in this.state.orderForm)
        {
            formData[element] = this.state.orderForm[element].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order).then(response => {
            console.log(response);
            this.setState({loading:false});
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
            this.setState({loading:false});
        })
    }

    checkValidity (value, rules) {
        let isValid = true;

        if(isValid && rules.required) {
            isValid = value.trim() !== '';
        }

        if(isValid && rules.minLength) {
            isValid = value.length >= rules.minLength;
        }

        if(isValid && rules.maxLength) {
            isValid = value.length <= rules.maxLength;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedElement = {
            ...updatedForm[inputId]
        }
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;
        updatedForm[inputId] = updatedElement;
        
        let formIsValid = true;
        for(let inputId in updatedForm){
            formIsValid = updatedForm[inputId].valid && formIsValid;
        }

        this.setState({orderForm:updatedForm, formIsValid: formIsValid});

    }

    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm)
        {
            formElementArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input key={formElement.id} 
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value} 
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    shouldValidate={formElement.config.validation} />
                ))}
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.state.loading)
            form = <Spinner />;
        

        return (
            <div className={classes.ContactData}>
                <h4>Enter you contact info</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;