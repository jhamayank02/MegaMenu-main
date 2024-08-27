// import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { applyCouponcode } from "../../features/cartSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {removeItem } from "../../features/cartSlice";
import { addcarts } from "../../features/cartSlice";
import { base_url } from "../../Utils/baseUrl";
const CheckOut = () => {
  const { carts, totalAmount, totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
 
      const amount = totalAmount;
      const currency = "INR";
      const receiptId = `recipt_${Math.random()*1000+Date.now()}`;
  const paymentHandler = async (e) => {
    const response = await fetch( `${ base_url}payment/createOrder`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_w1uLMB3KcY9AUd", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "KFS Fitness", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          `${ base_url}payment/verifyPayments`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      // prefill: {
      //   //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
      //   name: "Web Dev Matrix", //your customer's name
      //   email: "webdevmatrix@example.com",
      //   contact: "9000000000", //Provide the customer's phone number for better conversion rates
      // },
      // notes: {
      //   address: "Razorpay Corporate Office",
      // },
      // theme: {
      //   color: "#3399cc",
      // },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };


  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleIncr = (item) => {
    dispatch(addcarts(item));
  };

  const handleDecr = (item) => {
    dispatch(removeItem(item));
  };
  return (
    <>
      <div className=" flex p-4">
        <div className="left-box w-[100vw] h-full p-4 ">
          <div className="bg-gray-100 rounded-md p-2 ">
            <h1 className="text-2xl font-bold uppercase">Cart CheckOut</h1>
            <p className="item">{carts.length} Item in your cart</p>
          </div>
          <div className="cart-items">
            <div className="cart-container w-full flex flex-col gap-2 items-center justify-around max-h-[50vh] overflow-y-scroll  no-scrollbar">
              {/* cart items here */}
              {carts.length !== 0 &&
                carts?.map((item) => (
                  <div
                    className="flex  border-2 w-full items-start justify-start gap-2 p-2 relative"
                    key={item.id}
                  >
                    <span
                      className="text-red-500  cursor-pointer rounded-full absolute right-3 font-bold"
                      onClick={() => handleRemoveItem(item)}
                    >
                      <IoIosCloseCircleOutline size={22} />
                    </span>
                    <div className="img p-2 w-fit">
                      {item.images && (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className=" object-cover h-44 w-44"
                        />
                      )}
                    </div>
                    <div className="flex items-start w-full pt-2  justify-around flex-col">
                      <p className="font-bold">{item.name.slice(0, 20)}</p>
                      <p className="flex items-center">
                        <LiaRupeeSignSolid />
                        {item.price}
                      </p>
                      <p className="quantity">{item.quantity}</p>
                      <div className="flex items-center  gap-2  rounded-full bg-[#0A2440]/10  w-fit p-2">
                        <button
                          className="bg-[#0A2440] active:scale-95 h-6 w-6 rounded-full text-white  "
                          onClick={() => handleIncr(item)}
                        >
                          +
                        </button>
                        <p className="">{item.quantity}</p>
                        <button
                          className="bg-[#0A2440] h-6 w-6 active:scale-95 rounded-full text-white "
                          onClick={() => handleDecr(item)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="right-box h-fit p-4 bg-gray-100 rounded-md shadow-sm mt-4">
          <div className=" p-4 Copoun-Code rounded-md space-y-4">
            <div className=" space-y-2">
              <h1 className="text-2xl font-bold">Copoun Code</h1>
              <p className="some-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis recusandae accusamus dolor maiores.
              </p>
            </div>
            <div className="copoun-input flex flex-col gap-4 ">
              <input
                type="text"
                value={20}
                className="h-12 rounded-full border px-4 placeholder:px-2 focus:outline-[#0A2440]"
                placeholder="Enter your copoun code"
              />
              <button className="bg-[#0A2440] text-white p-2 rounded-md">
                Apply Copoun
              </button>
            </div>
          </div>
          <div className="cart-box p-4 space-y-2">
            <div className="bg-[#0A2440] text-white p-4 rounded-md uppercase font-bold">
              <h1>Cart Total</h1>
            </div>
            <div className="calculation-box border-2 p-2 rounded-md bg-gray-200">
              <div className="sub-total flex justify-between p-2 ">
                <p className="">Sub Total</p>
                <p className=" font-bold flex gap-1 items-center">
                  <LiaRupeeSignSolid />
                  {totalAmount}
                </p>
              </div>

              <div className="sub-total flex justify-between p-2">
                <p>Copoun Discount</p>
                <p className=" font-bold flex gap-1 items-center">
                  <LiaRupeeSignSolid />
                  {/* {totalAmount} */}
                  0
                </p>
              </div>

              {/* <div className="sub-total flex justify-between p-2">
                <p>Shipping Charges</p>
                <p className=" font-bold flex gap-1 items-center ">
                  <LiaRupeeSignSolid />
                  {totalAmount}
                </p>
              </div> */}

              <div className="sub-total flex justify-between p-2 font-bold text-xl">
                <p>Cart Total</p>
                <p className=" font-bold flex gap-1 items-center">
                  <LiaRupeeSignSolid />
                  {totalAmount}
                </p>
              </div>
            </div>
            <div 
            className="checkout-button w-full flex items-center justify-center" 
            onClick={paymentHandler}>
              <button className="bg-[#0A2440] w-full text-white p-2 rounded-md">
                CheckOut
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
