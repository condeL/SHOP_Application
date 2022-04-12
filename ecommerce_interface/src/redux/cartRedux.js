import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        cartQuantity:0,
        total:0
    },
    reducers:{
        addProduct:(state, action)=>{
            let inCart = false;
            for (let product of state.products) {
                if (product._id === action.payload._id) {
                    product.quantity += action.payload.quantity;
                    inCart=true;
                    break;
                }
            }
            if(!inCart){
                state.products.push(action.payload);
            }

            state.total = calculateTotal(state.products)
            state.cartQuantity = state.products.length;

        },
        changeQuantity:(state, action)=>{
            state.products[action.payload.index].quantity+=action.payload.quantity;

            if(state.products[action.payload.index].quantity<=0){
                state.products.splice(action.payload.index,1);
            }

            state.total = calculateTotal(state.products)

            state.cartQuantity = state.products.length;

        },
        checkout:(state, action)=>{
            state.products.length=0;
            state.cartQuantity=0;
            state.total=0;
}

    }
})

function calculateTotal(products){
    let total =0;
    for(let product of products){
        total += product.price*product.quantity;
    }
    return total;
}

export const {addProduct, changeQuantity, checkout} = cartSlice.actions
export default cartSlice.reducer;