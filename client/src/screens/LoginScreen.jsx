import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FormContainer } from "../components/FormContainer.jsx";
import { useLoginMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { toast } from "react-toastify";
import Loader from "../components/Loader.jsx";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      navigate("/");
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Login failed");
    }
  };

  return (
    <FormContainer>
      <h1>Sign-In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading && <Loader />}
        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>

        <Row className="py-3">
          <Col>
            New Customer?{" "}
            <Link to={"/register"} className="text-blue-600">
              Register
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};
