function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Contact</h2>
          <p>Contact Us</p>
        </div>
      </div>

      <div data-aos="fade-up">
        <iframe
          style={{ border: "0 ", width: "100%", height: "350px" }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0029641234432!2d105.848146!3d21.032567399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5af3fc6599%3A0x71b6c0b7fd60df54!2sSWI%3AP%20Speakeasy%20bar!5e0!3m2!1sen!2s!4v1710955715155!5m2!1sen!2s"
          frameborder="0"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}

export default Contact;
