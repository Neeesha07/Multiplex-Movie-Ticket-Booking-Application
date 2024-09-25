import React from 'react';
import DiscountCard from './DiscountCard';

const DiscountList = () => {
  const discounts = [
    { code: 'SUMMER25', percentage: 25, amount: 100 },
    { code: 'FALL20', percentage: 20, amount: 75 },
    { code: 'WINTER15', percentage: 15, amount: 50 },
    { code: 'SPRING10', percentage: 10, amount: 25 },
  ];

  return (
    <div className="flex flex-wrap  gap-10">
      {discounts.map((discount, index) => (
        <DiscountCard
          key={index}
          discountCode={discount.code}
          discountPercentage={discount.percentage}
          applicableAmount={discount.amount}
        />
      ))}
    </div>
  );
};

export default DiscountList;