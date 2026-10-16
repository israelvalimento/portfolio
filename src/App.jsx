import Spotlight from "./components/Spotlight";
import { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Carousell from "./components/Carousell";
import { projects } from "./components/projects";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CustomCursor from "./components/CustomCursor";

// Replace null with an imported screenshot for each testimonial when available.
const testimonialScreenshots = [null, null, null];

const services = [
  [
    "◎",
    "Domain Setup",
    "Get your own website address without the technical hassle. I handle the domain connection and configuration so your site is ready to visit.",
  ],
  [
    "▣",
    "App Development",
    "Custom apps designed around your needs, with simple interfaces that make everyday tasks easier.",
  ],
  [
    "⚙",
    "Hardware Development",
    "Hardware prototypes and device integrations that turn your ideas into practical, working projects.",
  ],
  [
    "↗",
    "Website Design",
    "Custom layouts that reflect your brand and make a strong first impression.",
  ],
  [
    "▧",
    "Web Development",
    "Responsive websites built to work smoothly across desktop, tablet, and mobile.",
  ],
  [
    "✳",
    "Landing Pages",
    "Focused pages to introduce your business, showcase an offer, or launch a product.",
  ],
  [
    "ϟ",
    "Website Redesign",
    "Refresh an existing website with clearer layouts, modern visuals, and easier navigation.",
  ],
  [
    "◎",
    "Ai Integration",
    "Integrate artificial intelligence into your website to enhance user experience and provide personalized recommendations.",
  ],
  [
    "↔",
    "Website Maintenance",
    "Ongoing fixes, content updates, and improvements to keep your website running smoothly.",
  ],
];
export default function App() {
  const screenshotDialog = useRef(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);
  const [activeProject, setActiveProject] = useState(2);
  const [spotlightProject, setSpotlightProject] = useState(2);
  return (
    <main
      style={{
        "--selected-project-image": `url(${projects[activeProject][2]})`,
      }}
    >
      <CustomCursor />
      <section className="hero" id="home">
        <Navbar />
        <div className="hero-copy">
          <h1>
            Ideas made
            <br />
            real.
          </h1>
          <p>
            Digital experiences with purpose.
            <br />A little different. Entirely you.
          </p>
        </div>
        <Carousell
          active={activeProject}
          setActive={setActiveProject}
          onSelect={setSpotlightProject}
        />
      </section>
      <section className="services section-shell" id="about">
        <span className="eyebrow">SERVICES</span>
        <h2>
          Services.
          <br />
        </h2>
        <div className="services-mission">
          <h3>Your idea, built with care.</h3>
          <p>
            Whether you need a website, an app, custom software, or a hardware
            project, I start with what you need it to do. I work with you directly
            to turn your idea into something practical, easy to use, and built
            with care. You get clear updates, attention to detail, and a focus on
            solving the right problem, so your project serves a real purpose.
          </p>
        </div>
        <div className="service-grid">
          {services.map(([icon, title, description]) => (
            <article className="service-card" key={title}>
              <span className="service-icon">{icon}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="why-project section-shell" aria-labelledby="why-project-title">
        <div className="why-project-intro">
          <span className="eyebrow">WHY CHOOSE PRO-JECT?</span>
          <h2 id="why-project-title">Big ideas.<br />A practical starting point.</h2>
          <p>You want something that looks professional, works for your customers, and makes sense for your budget. That’s where we start.</p>
          <a className="why-project-link" href="#contact">Let’s talk about your idea ↗</a>
        </div>
        <div className="why-project-reasons">
          {[
            ["A budget you can plan around.", "We work out what matters most, agree on the scope and cost, and start with what you need. Build the essentials now, with room to grow later."],
            ["One person. Clear answers.", "Talk directly to the person building your project. Ask questions, share feedback, and get updates in plain language so you know where things stand."],
            ["Built around your business.", "Your project should do more than look good. From helping customers find you to making enquiries easier, every decision starts with what you need it to do."],
            ["Start small. Move forward.", "You don’t need every feature on day one. We can focus on a useful first version, then plan improvements as your needs become clearer."],
          ].map(([title, description], index) => (
            <article className="why-project-reason" key={title}>
              <span className="why-project-number" aria-hidden="true">0{index + 1}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </article>
          ))}
        </div>
      </section>
      <Spotlight active={spotlightProject} setActive={setSpotlightProject} />
      <section className="testimonials section-shell" id="testimonials" aria-labelledby="testimonials-title">
        <span className="eyebrow">TESTIMONIALS</span>
        <h2 id="testimonials-title">What clients say.</h2>
        <div className="testimonial-grid">
          {[
            "The website is easy to use and makes our business look professional. The whole process was clear from start to finish.",
            "My ideas were listened to and turned into a website that feels right for my brand. I appreciated the care put into the details.",
            "Communication was clear, updates were easy to follow, and the site works well on my phone. I’m happy with how it came together.",
          ].map((quote, index) => (
            <figure className="testimonial-card" key={index}>
              <span className="testimonial-quote" aria-hidden="true">“</span>
              <blockquote>{quote}</blockquote>
              <figcaption>
                <span className="testimonial-avatar" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span>Sample testimonial<small>Placeholder — not actual client feedback</small></span>
              </figcaption>
              <button
                className="testimonial-proof"
                aria-haspopup="dialog"
                onClick={() => {
                  setSelectedTestimonial(index);
                  screenshotDialog.current.showModal();
                }}
              >
                View screenshot ↗
              </button>
            </figure>
          ))}
        </div>
      </section>
      <dialog
        ref={screenshotDialog}
        className="testimonial-dialog"
        aria-labelledby="screenshot-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
              event.currentTarget.close();
            }
          }
        }}
      >
        <div className="testimonial-dialog-heading">
          <h2 id="screenshot-title">Testimonial screenshot</h2>
          <button onClick={() => screenshotDialog.current.close()} aria-label="Close screenshot">×</button>
        </div>
        {testimonialScreenshots[selectedTestimonial] ? (
          <img src={testimonialScreenshots[selectedTestimonial]} alt={`Original client feedback for testimonial ${selectedTestimonial + 1}`} />
        ) : (
          <div className="testimonial-proof-placeholder">
            <p>Screenshot coming soon.</p>
            <span>This is a sample testimonial. Actual client feedback has not been added yet.</span>
          </div>
        )}
      </dialog>
      <section className="contact" id="contact">
        <span className="eyebrow">GOT A PROJECT IN MIND?</span>
        <a className="connect-title" href="mailto:krisslazarte@gmail.com">
          LET’S CONNECT ↗
        </a>
        <a className="contact-circle" href="mailto:krisslazarte@gmail.com">
          MAKE IT
          <br />
          HAPPEN ↗
        </a>
        <span className="contact-note">GOOD THINGS START WITH A HELLO.</span>
      </section>
      <Footer />
      <BackToTop />
    </main>
  );
}


