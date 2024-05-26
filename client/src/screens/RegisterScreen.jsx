import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap"; // Make sure to import from "react-bootstrap" instead of "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { FormContainer } from "../components/FormContainer.jsx";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader.jsx";
import { useRegisterMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
export const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  const [register, { isLoading }] = useRegisterMutation();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success("Sign-up successful!");
      } catch (err) {
        toast.error(err?.data?.message || err.error || "Login failed");
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign-Un</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader />}
        <Button type="submit" variant="primary" className="mt-3">
          Sign Up
        </Button>

        <Row className="py-3">
          <Col>
            Already Have an Account?
            <Link to={"/login"} className="text-blue-600">
              Login
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};
