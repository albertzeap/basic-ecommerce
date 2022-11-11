import React from 'react'
import withContext from '../withContext';
import CartItem from "./CartItem";

const Cart = props => {
    const { cart } = props.context;
    const cartKeys = Object.keys(cart || {});
    let total = 0;

    return (
        <>
          <div className="hero is-primary">
            <div className="hero-body container">
              <h4 className="title">My Cart</h4>
            </div>
          </div>
          <br />
          <div className="container">
            {cartKeys.length ? (
              <div className="column columns is-multiline">
                {cartKeys.map(key => (
                  <CartItem
                    cartKey={key}
                    key={key}
                    cartItem={cart[key]}
                    removeFromCart={props.context.removeFromCart}
                  />
                ))}
                <div className="column is-12 is-clearfix">
                  <br />
                  <div className="is-pulled-right">

                    <div>
                     {cartKeys.forEach(key => {
                       total = total + (parseFloat(cart[key].product.price) * cart[key].amount);

                       // Look into how to refactor this code without having to return empty tags
                      //  return <></>;
                     })}
                     <h4 className="title is-4 pb-2">Total: ${total}</h4>
                    </div>

                    <button
                      onClick={props.context.clearCart}
                      className="button is-warning "
                    >
                      Clear cart
                    </button>{" "}
                    <button
                      className="button is-success"
                      onClick={props.context.checkout}
                    >
                      Checkout
                    </button>

                  </div>
                </div>
              </div>
            ) : (
              <div className="column">
                <div className="title has-text-grey-light">No item in cart!</div>
              </div>
            )}
          </div>
        </>
      );
};



export default withContext(Cart);