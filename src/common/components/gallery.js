function Gallery({ gallery }) {
  return (
    <section id="gallery" className="gallery">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>Some photos from Our Bar</p>
        </div>
      </div>

      <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-0">
          {gallery?.map((img) => (
            <div key={img.img_id} className="col-lg-3 col-md-4">
              <div className="gallery-item">
                <div className="gallery-lightbox" data-gall="gallery-item">
                  <img
                    src={img.img}
                    alt={img.img_alt || "Image"}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
