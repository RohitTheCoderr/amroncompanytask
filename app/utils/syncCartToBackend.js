import { postData } from "./apicall";

export const syncGuestCartToBackend = async () => {
  const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
console.log("guestcartdata",guestCart);

  for (let item of guestCart) {
    console.log("item", item);
    
    await postData('/users/addtocart', {
      productId: item.productId,
      Quantity: item.Quantity,
      size: item.size,
    });
  }

  localStorage.removeItem('guestCart');
};
