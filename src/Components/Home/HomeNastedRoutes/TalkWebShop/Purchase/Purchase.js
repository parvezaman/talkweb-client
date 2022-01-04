import React, { useEffect, useState } from "react";
import { Alert, Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Purchase = () => {
  const { productId } = useParams();
  const initialInfo = {
    userName: "",
    email: "",
    phone: "",
    address: "",
    status: "Pending",
  };

  const [orderInfo, setOrderInfo] = useState(initialInfo);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [purchase, setPurchase] = useState({});

  useEffect(() => {
    fetch(`https://pacific-escarpment-25603.herokuapp.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setPurchase(data[0]));
  }, [productId]);

  const handleOnBlur = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newInfo = { ...orderInfo };
    newInfo[field] = value;
    setOrderInfo(newInfo);
  };
  const handlePurchase = (event) => {
    alert("Purchasing");
    const order = {
      ...orderInfo,
      productId,
      orderName: purchase.name,
    };
    fetch("https://pacific-escarpment-25603.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setOrderSuccess(true);
        }
      });
    event.target.reset();
    event.preventDefault();
  };

  return (
    <div className="container">
      <h2 className="text-center text-info p-5"> Order Id: {productId}</h2>
      <div className="container mb-5">
        <Card>
          <div>
            <Card.Img
              className=" h-100 w-100 "
              variant="top"
              src={purchase?.picture}
            />
          </div>
          <Card.Body className="bg-light">
            <Card.Title>
              <h3 className="text-primary"> Name : {purchase?.name}</h3>
            </Card.Title>
            <Card.Title>
              <h3 className="text-danger">Brand: {purchase?.company} </h3>
            </Card.Title>
            <Card.Title>
              <h3 className="text-primary">Price: ${purchase?.price}</h3>
            </Card.Title>
            <Card.Title>
              <h3 className="text-primary">{purchase?.about}</h3>
            </Card.Title>
          </Card.Body>
        </Card>
      </div>

      {orderSuccess && <Alert severity="success">Order successfully!</Alert>}
      <div>
        <Card className="p-5">
          <h4 className="ml-5">Product Name: {purchase.name}</h4>

          {/*---------- using form ---------- */}

          <Form
            style={{ width: "85%", marginTop: "20px", marginBottom: "20px" }}
            onSubmit={handlePurchase}
          >
            <Form.Control
              onBlur={handleOnBlur}
              className="mb-3"
              disabled
              defaultValue={productId}
              type="text"
            />

            <FloatingLabel
              onBlur={handleOnBlur}
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control name="email" type="email" />
            </FloatingLabel>

            <FloatingLabel
              onBlur={handleOnBlur}
              className="mb-3"
              controlId="floatingInput"
              label=" Your Name"
            >
              <Form.Control name="userName" type="Text" />
            </FloatingLabel>

            <FloatingLabel
              onBlur={handleOnBlur}
              className="mb-3"
              controlId="floatingInput"
              label="Mobile Number"
            >
              <Form.Control name="phone" type="number" />
            </FloatingLabel>

            <Form.Control
              name="price"
              onBlur={handleOnBlur}
              className="mb-3"
              disabled
              defaultValue={purchase?.price}
              type="number"
            />

            <Form.Control
              name="productName"
              onBlur={handleOnBlur}
              className="mb-3"
              disabled
              defaultValue={purchase?.name}
              type="text"
            />

            <FloatingLabel
              onBlur={handleOnBlur}
              className="mb-3"
              controlId="floatingInput"
              label="Shipping Address"
            >
              <Form.Control name="address" type="Text" />
            </FloatingLabel>

            <Button type="submit" variant="secondary">
              Purchase
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Purchase;
