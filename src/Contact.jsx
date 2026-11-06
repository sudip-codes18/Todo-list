function Contact({ goToHome }) {
  return (
    <div>
      <h1>Contact Page</h1>
      {/* Clicking this button runs the goToHome function */}
      <button onClick={goToHome}>
        Back to home
      </button>
    </div>
  );
}

export default Contact;