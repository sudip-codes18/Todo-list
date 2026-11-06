function Home({ goToContact }) {
  return (
    <div>
      <h1>Welcome to My Home Page</h1>
      {/* Clicking this button runs the goToContact function */}
      <button onClick={goToContact}>
        Go to Contact Page
      </button>
    </div>
  );
}

export default Home;