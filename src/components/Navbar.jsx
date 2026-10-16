export default function Navbar() {
  return (
    <header className="navbar">
      <a className="brand brand-project" href="#home" aria-label="pro-ject home">pro-ject</a>
      <span className="nav-intro">Your ideas, projected.<br />Websites, apps &amp; beyond.</span>
      <nav aria-label="Main navigation">
        <a href="#work">WORK</a>
        <a href="#about">ABOUT</a>
        <a href="#contact">LET’S TALK ↗</a>
      </nav>
    </header>
  );
}
