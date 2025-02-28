import Button from "../components/Button";
const LandingPage = () => {
  return (
    <>
      <div className="landing-page-container">
        <div className="landing-page-header-container">
          <h1>Welcome to [Arr]ange!</h1>
          <div className="landing-page-content">
            <div className="landing-page-text">
              <p className="landing-page-medium-text">
                Your all-in-one platform to track job applications, manage
                documents, and stay on top of your career goals.
              </p>
              <p>Job hunting, arranged your way.</p>
            </div>
            <div className="landing-page-btns">
              <Button className="landing-btns">Sign Up</Button>
              <Button>Log In</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
