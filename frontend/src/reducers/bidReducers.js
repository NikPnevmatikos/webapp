export const bidReducer = (state = { bidItems: []}, action) => {
    switch (action.type) {
        case 'BID_ITEM':
            const item = action.payload
            const exist = state.bidItems.find(x => x.product === item.product)

            if (exist) {
                return {
                    ...state,
                    bidItems: state.bidItems.map(x =>
                        x.product === exist.product ? item : x)

                    //for in product:
                        //if i.name == found.name
                            //i = found
                        //else
                            //i = i
                }

            } else {
                return {
                    ...state,
                    bidItems: [...state.bidItems, item]
                }
            }

        case 'REMOVE_BID':
            return {
                ...state,
                bidItems: state.bidItems.filter(x => x.product !== action.payload)
            }

        // case CART_SAVE_SHIPPING_ADDRESS:
        //     return {
        //         ...state,
        //         shippingAddress: action.payload
        //     }

        // case CART_SAVE_PAYMENT_METHOD:
        //     return {
        //         ...state,
        //         paymentMethod: action.payload
        //     }

        // case CART_CLEAR_ITEMS:
        //     return {
        //         ...state,
        //         cartItems: []
        //     }

        default:
            return state
    }
}