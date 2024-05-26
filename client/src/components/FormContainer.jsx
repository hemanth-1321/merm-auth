import { Container, Row, Col } from "react-bootstrap";

import React from "react";

export function FormContainer({ children }) {
  return (
    <Container>
      <Row className="justify-content-md-cenmter mt-5">
        <Col xs={12} md={6} className="card p-5s">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
