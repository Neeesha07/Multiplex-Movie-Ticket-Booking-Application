import React from 'react';
import { Card, CardBody, CardHeader,  } from 'react-bootstrap';




const DiscountCard = ({ discountCode, discountPercentage, applicableAmount }) => {
  return (
    <Card className="bg-gradient-to-r from-indigo-500 to-pink-500 text-Black h-full border-1 border-dark flex flex-col " style={{ width: '300px' }}>
      <CardHeader className="flex-grow">
        <h5 size="lg" className="mb-2">{discountCode}</h5>
        <p className="text-2xl font-bold">{discountPercentage}% OFF</p>
      </CardHeader>
      <CardBody>
    <p className="text-sm">Up to ₹{applicableAmount}</p>
      </CardBody>
    </Card>
  );
};

export default DiscountCard;

