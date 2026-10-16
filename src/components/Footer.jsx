const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer section-shell">
      <div className="footer-grid">
        <div>
          <h2>
            Stay
            <br />
            Connected
          </h2>
          <p>
            Have an idea worth making?
            <br />
            Let’s create something together.
          </p>
          <a className="email-link" href="mailto:krisslazarte@gmail.com">
            Say hello <span>↗</span>
          </a>
        </div>
        <div>
          <h3>Quick Links</h3>
          <a href="#home">Home</a>
          <a href="#about">About Me</a>
          <a href="#work">Selected Work</a>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <h3>Contact Me</h3>
          <p>
            Based in the Philippines
            <br />
            Working everywhere
          </p>
          <a href="mailto:krisslazarte@gmail.com">Email Me ↗</a>
          <p>● Open for collaborations</p>
        </div>
        <div>
          <h3>Follow Along</h3>
          <div className="socials">
            <a href="https://www.instagram.com/" aria-label="Instagram">
              ig
            </a>
            <a href="https://www.behance.net/" aria-label="Behance">
              Bē
            </a>
            <a href="https://www.linkedin.com/" aria-label="LinkedIn">
              in
            </a>
          </div>
          <p>
            Made with intention.
            <br />
            And a little coffee.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {currentYear} pro-ject. All rights reserved.</span>
      </div>
    </footer>
  );
}
