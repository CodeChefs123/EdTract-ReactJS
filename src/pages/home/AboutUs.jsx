import "../../styles/AboutUs.css"; // Importing our custom CSS for styling

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>Welcome to Our Company</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          condimentum leo eget convallis varius.
        </p>
        <p>
          Mauris nec nunc at urna consequat faucibus. Sed vestibulum ante at ex
          eleifend, at tempor lectus fermentum.
        </p>
        <p>
          Nulla vitae est vel lacus ultricies feugiat. Aenean sit amet felis a
          libero efficitur aliquet ac ac sapien.
        </p>
      </div>
      <div className="about-us-image">
        <img src="logo.png" alt="About Us" />
      </div>
    </div>
  );
}

export default AboutUs;
