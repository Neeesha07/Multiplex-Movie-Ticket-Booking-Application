import React from 'react';
import { Card, CardHeader, CardBody } from 'react-bootstrap';

const DiscountCard = ({ discountCode, discountPercentage, applicableAmount }) => {
  return (
    <Card className="bg-gradient-to-r from-indigo-500 to-pink-500 text-black w-24">
      <CardHeader>
        <h5 className="mb-0">Discount Code</h5>
        <p className="mb-0 text-sm">{discountCode}</p>
      </CardHeader>
      <CardBody>
        <h5 className="mb-2">Discount Percentage</h5>
        <p className="mb-2 text-sm">{discountPercentage}%</p>
        <h5 className="mb-0">Applicable Amount</h5>
        <p className="mb-0 text-sm">${applicableAmount}</p>
      </CardBody>
    </Card>
  );
};

export default DiscountCard;