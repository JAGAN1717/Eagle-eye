import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cartItem : [],
    cartQuantity : 0,
    cartTotal :0
};



const CartSlice = createSlice({
    name : "cart",
     initialState : { value : {Price:0}},
    //initialState,
    reducers : {
        addTocart : (state , action) =>{
            state.value = action.payload
            //const temproduct = {...action.payload, Quantity : 1}
            //state.cartItem.push(action.payload);

        }
    }
})

export const {addTocart} = CartSlice.actions
export default CartSlice.reducer;