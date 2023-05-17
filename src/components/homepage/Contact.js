const Contact = () => {
    return (
        <section class="contact" id="contact">
            <div class="contact-text">
                <h2>
                    Contact <span>Us!</span>
                </h2>
                <h4>If you have any issues in your mind.</h4>
                <p>You can contact us..</p>
                <div class="list">
                    <li>
                        <a href="#">+91 9823671921</a>
                    </li>
                    <li>
                        <a href="#">timetable@nith.ac.in</a>
                    </li>
                    <li>
                        <a href="#">Like Share & Subscribe</a>
                    </li>
                </div>

                <div class="contact-icons">
                    <a href="#">
                        <i class="bx bxl-facebook"></i>
                    </a>
                    <a href="#">
                        <i class="bx bxl-twitter"></i>
                    </a>
                    <a href="#">
                        <i class="bx bxl-instagram-alt"></i>
                    </a>
                    <a href="#">
                        <i class="bx bxl-youtube"></i>
                    </a>
                </div>
            </div>
            <div class="contact-form">
                <form action="">
                    <input type="name" placeholder="Your Name " required />
                    <input type="email" placeholder="Your Email " required />
                    <input
                        type="number"
                        placeholder="your Mobile Number"
                        required
                    />
                    <textarea
                        name=""
                        id=""
                        cols="35"
                        rows="10"
                        placeholder="How Can We Help You "
                        required
                    ></textarea>
                    <input
                        type="submit"
                        value="Send Message"
                        class="submit"
                        required
                    />
                </form>
            </div>
        </section>
    );
};

export default Contact;
