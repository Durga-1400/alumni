import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

const Home = () => {
  const sliderImages = [
    {
      src:"https://content.jdmagicbox.com/comp/guntur/25/9999pmulhydstd80225/catalogue/narasaraopeta-engineering-college-narasaraopet-engineering-colleges-1OWq8ymHSWR5RdD.jpg",
      alt: "Welcome to NEC Alumni Automation",
    },
    {
      src: "https://i0.wp.com/www.nrtec.in/wp-content/uploads/2018/08/Industry.jpg?fit=870%2C285&ssl=1",
      alt: "Stay Connected with Your Alma Mater",
    },
    {
      src: "https://media.collegedekho.com/media/img/institute/crawled_images/None/Screenshot_from_2024-07-22_10-43-19.png",
      alt: "Empowering Alumni Together",
    },
  ];

  const leaders = [
    {
      title: "Chairman",
      name: "Sri. M.V. Koteswara Rao",
      message:
        "As the Chairman of Narasaraopeta Engineering College, I am honored to welcome all alumni to our Alumni Automation System. This platform bridges the gap between our alumni and the college, fostering collaboration and professional growth.",
      imgSrc: "https://i0.wp.com/www.nrtec.in/wp-content/uploads/2021/07/chairman-of-NEC.jpg?fit=853%2C1280&ssl=1", // Replace with actual image
    },
    {
      title: "Principal",
      name: "Dr. M. Sreenivasa Kumar",
      message:
        "As Principal, I encourage alumni to engage with the Alumni Automation System, a platform to exchange ideas and contribute to the college’s growth. Together, we can guide future generations.",
      imgSrc: "https://i0.wp.com/www.nrtec.in/wp-content/uploads/2024/07/principal-nec-1.jpg?fit=1200%2C1598&ssl=1", // Replace with actual image
    },
    {
      title: "Vice Chairman",
      name: "Mr. Chakravarthi Mittapalli",
      message:
        "The NEC Alumni Automation System is a valuable initiative that helps us build a stronger bond between the college and our alumni.",
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQvep1Syl08NADlcgCsh2X4-9OWOvXq_HfRQ&s", // Replace with actual image
    },
    {
      title: "Vice Principal",
      name: " Dr. D. Suneel",
      message:
        "This platform will empower our alumni and students, creating a collaborative environment for progress.",
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEVsfR4MGxdV6fqpbGLzhmkFKnpPnNY_RxeA&s", // Replace with actual image
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true, // Ensures the images loop continuously
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000, // 2 seconds for each slide
  };

  return (
    <div className="home-container">
      {/* Image Slider */}
      <Slider {...sliderSettings} className="image-slider">
        {sliderImages.map((image, index) => (
          <div key={index} className="slider-image-wrapper">
            <img src={image.src} alt={image.alt} className="slider-image" />
          </div>
        ))}
      </Slider>

      {/* Welcome Section */}
      <h1 className="welcome-title">Welcome to Alumni Automation System</h1>

      {/* Leaders Section */}
      <div className="leaders-section">
        {leaders.map((leader, index) => (
          <div key={index} className="leader-card">
            <img
              src={leader.imgSrc}
              alt={`${leader.title}`}
              className="leader-image"
            />
            <h2 className="leader-title">{leader.title}</h2>
            <h3 className="leader-name">{leader.name}</h3>
            <p className="leader-message">{leader.message}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Narasaraopeta Engineering College. All
          rights reserved.
        </p>
        <p>Contact us at alumni@nec.edu.in</p>
      </footer>
    </div>
  );
};

export default Home;
