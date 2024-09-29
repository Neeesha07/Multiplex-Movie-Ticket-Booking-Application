// DiscountFooter.js
import React, { useEffect } from 'react';
import DiscountCard from './DiscountCard';
import { useDispatch, useSelector } from 'react-redux';
import { setDiscounts } from '../features/discountSlice';

const DiscountFooter = () => {
  const dispatch = useDispatch();
  const { discounts, loading } = useSelector((state) => state.discount);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await fetch(`http://win10-2-186:8888/ticketBooker/getalldiscounts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(setDiscounts(data)); // Dispatch action to set discounts in Redux
      } catch (error) {
        console.error('Error fetching discounts:', error);
      }
    };

    fetchDiscounts();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid py-2 mb-2 bg-light">
      <div className="d-flex justify-content-center align-items-center flex-column pt-5 min-vh-75">
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
    </div>
  );
};

export default DiscountFooter;
