import React from 'react';
import './About.css';

const Home = () => {
    return (
        <div className="home-page">
            
            <main className="home-main">
                {/* Introduction Section */}
                <section className="introduction">
                    <h2>Welcome to the Alumni Automation System</h2>
                    <p>
                        The Alumni Automation System is a cutting-edge platform created to foster a strong connection between Narasaraopeta Engineering College and its esteemed alumni. This system aims to create an interactive space where alumni can communicate, collaborate, contribute, and give back to their alma mater.
                    </p>
                    <p>
                        With a strong network, alumni can share their experiences, seek career opportunities, mentor students, and contribute to the growth and development of the institution.
                    </p>
                </section>

                {/* Features Section */}
                <section className="features">
                    <h2>Key Features</h2>
                    <div className="feature-card">
                        <h3>Reconnect</h3>
                        <p>Stay connected with your Alumni Members across the globe. Reconnect with old friends and peers through the platform.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Discover</h3>
                        <p>Explore exclusive job opportunities, mentorship programs, workshops, and events tailored for alumni. Gain access to a network of professionals and potential career advancements.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Contribute</h3>
                        <p>Your contributions are vital in shaping the future of Narasaraopeta Engineering College. Support the institution with donations, mentorship, guest lectures, and more.</p>
                    </div>
                </section>

                {/* Objectives Section */}
                <section className="objectives">
                    <h2>Objectives of the Alumni Automation System</h2>
                    <p>
                        The primary objectives of the Alumni Automation System include:
                    </p>
                    <ul>
                        <li><strong>Networking:</strong> Build a strong, global alumni network for better professional and personal connections.</li>
                        <li><strong>Career Development:</strong> Provide career development opportunities through job postings, internships, and mentorship.</li>
                        <li><strong>Community Engagement:</strong> Facilitate community events such as webinars, workshops, and reunions to foster engagement.</li>
                        <li><strong>Institution Support:</strong> Encourage alumni to contribute to the growth of the college by providing resources and funding.</li>
                    </ul>
                </section>

                {/* How It Works Section */}
                <section className="how-it-works">
                    <h2>How It Works</h2>
                    <div className="how-it-card">
                        <h3>Profile Creation</h3>
                        <p>Alumni can create detailed profiles that include education, career, and personal achievements.</p>
                    </div>
                    <div className="how-it-card">
                        <h3>Search and Connect</h3>
                        <p>Alumni can search for fellow graduates, classmates, or mentors based on interests, location, or industry.</p>
                    </div>
                    <div className="how-it-card">
                        <h3>Job Board</h3>
                        <p>Alumni can post and browse job listings,  and volunteer opportunities.</p>
                    </div>
                    <div className="how-it-card">
                        <h3>Donations</h3>
                        <p>Alumni can easily contribute donations to the college for its development and initiatives.</p>
                    </div>
                </section>

                {/* Alumni Testimonials Section */}
                <section className="testimonials">
                    <h2>Alumni Testimonials</h2>
                    <div className="testimonial-card">
                        <p>"The Alumni Automation System has allowed me to reconnect with my friends and peers. The networking opportunities are endless!"</p>
                        
                    </div>
                    <div className="testimonial-card">
                        <p>"This platform helped me find the perfect job after graduation. It also allowed me to mentor students and contribute to the college’s growth."</p>
                        
                    </div>
                </section>
            </main>
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
