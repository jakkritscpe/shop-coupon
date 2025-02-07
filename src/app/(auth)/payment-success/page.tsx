import React from "react";
import Image from "next/image";

const PaymentSuccessPage = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="flex justify-center">
            <Image src="/success.svg" alt="Success" width={60} height={60} />
          </div>
          <h1 className="text-2xl font-bold mt-4">Payment Success</h1>
          <p className="text-base text-gray-500 mt-2">
            Thank you for your purchase!
          </p>
          <hr className="my-4" />
          <p className="text-base text-gray-500 mt-2">
            Your code is: &nbsp;
            <span className="badge badge-lg">325600</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessPage;
