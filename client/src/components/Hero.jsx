import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
export const Hero = () => {
  return (
    <div className="py-5">
      <Container className="d-flex  justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Mern Authentication</h1>
          <p className="text-center mb-4">
            THis is a boilerplate for Mern Authentication that stores a JWT an
            HTTP-Only cookie.It also uses Redux Toolkit and the React-Bootstrap
            library
          </p>
          <div className="d-flex">
            <LinkContainer to={"/login"}>
              <Button varient="primary" className="me-3">
                Sign In
              </Button>
            </LinkContainer>

            <LinkContainer to={"/register"}>
              <Button varient="secondary">Register</Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};
