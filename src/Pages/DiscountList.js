// DiscountList.js
import React, { useEffect } from 'react';
import DiscountCard from '../components/DiscountCard';
import Welcome from '../components/Welcome';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setDiscounts } from '../features/discountSlice';

const DiscountList = () => {
    const { discounts, loading } = useSelector((state) => state.discount);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid py-2 bg-light">
      <Welcome />
      <Navbar />
      <div className="d-flex justify-content-center align-items-center flex-column pt-5 mb-5 min-vh-75">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-x-20">
          {discounts.map((discount, index) => (
            <div key={index}>
              <DiscountCard
                discountCode={discount.discountCode}
                discountPercentage={discount.discountPercentage}
                applicableAmount={discount.applicabilityAmountLimit}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiscountList;
