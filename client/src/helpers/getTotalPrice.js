export const getTotalPrice = (cart) =>{
        let total = 0;
        for(let i=0; i<cart.length;i++){
            total += cart[i].price
        }

        return total
    }