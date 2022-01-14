import CartContext from "./cart-context";
import {useReducer} from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

// We put this outside of CartProvider because we don't need anything in that scope and because
// we don't want this re-evaluated when CartProvider is.
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        // It's important to use concat instead of push here, because concat returns a new array. push would
        // edit the existing array memory space, and React wouldn't know about that and could cause issues
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState;
};

// Everything under app.js happens to need access to Cart stuff. So all this 'could go' into the app.js, then
// in the app.js 'return' just use CartContext.Provider as the root. But here we extract all that out into
// it's own component (this) so it's cleaner.
const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item});
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>

};
export default CartProvider;
