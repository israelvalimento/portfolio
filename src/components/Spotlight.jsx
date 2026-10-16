import { useEffect } from 'react';
import { projects } from './projects';
import liteBox from '../assets/imgs/LiteBox.png';
import cointainer from '../assets/imgs/Container.png';

const ROTATION_DURATION_MS = 5000;
const spotlightProjects = [
  ...projects,
  ['LiteBox', liteBox, null, '', 'A simple image hosting service for uploading images and sharing them with a link.'],
  ['Cointainer', cointainer, null, '', 'A digital wallet interface for managing balances, transfers, and transactions.', 'Ongoing project'],
];

export default function Spotlight({ active, setActive }) {



  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % spotlightProjects.length);
    }, ROTATION_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [active, setActive]);

  return <section className="work section-shell" id="work">
    <div className="work-heading"><span className="eyebrow">FEATURED PROJECTS</span></div>
    <h2 className="featured-projects-title">Projects.</h2>
    <div className={`rotating-bento active-box-${active}`}>
      {spotlightProjects.map(([title, image, background, url, description, status], index) => <article key={title} className={`rotating-bento-box ${active === index ? 'expanded' : ''} ${!image ? 'bento-placeholder' : ''}`} style={{ backgroundImage: background ? `url(${background})` : undefined }}>
        {active === index && <span className="rotation-track" aria-hidden="true"><span key={active} className="rotation-progress" style={{ animationDuration: `${ROTATION_DURATION_MS}ms` }} /></span>}
        <button className="bento-select" onClick={() => setActive(index)} aria-pressed={active === index} aria-label={`Enlarge ${title}`} />
        <span className="bento-box-number">PROJECT / 0{index + 1}</span>
        {image ? <img src={image} alt={`${title} project preview`} /> : <span className="placeholder-plus" aria-hidden="true">+</span>}
        <div className="bento-box-label"><div className="bento-box-copy"><strong>{title}</strong>{status && <span className="project-status">{status}</span>}<p>{description}</p></div>{image && !status && <a className="project-visit" href={url || "about:blank"} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${title} website (opens in a new tab)`}>Visit site ↗</a>}</div>
      </article>)}
    </div>
  </section>;
}













