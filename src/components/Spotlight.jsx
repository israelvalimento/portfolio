import { useEffect } from 'react';
import { projects } from './projects';
import liteBox from '../assets/imgs/LiteBox.png';
import cointainer from '../assets/imgs/Container.png';
import cheapChat from '../assets/imgs/CheapChat.png';
import cheapChatBg from '../assets/imgs/CheapChatBg.png';
import debtTracker from '../assets/imgs/DebtTracker.png';
import skySnap from '../assets/imgs/SkySnap.png';
import skySnapBg from '../assets/imgs/SkySnapBg.png';

const ROTATION_DURATION_MS = 5000;
const spotlightProjects = [
  ...projects,
  ['LiteBox', liteBox, null, 'https://liteboxph.vercel.app/', 'A simple image hosting service for uploading images and sharing them with a link.'],
  ['Cointainer', cointainer, null, 'https://cointainer.vercel.app/login', 'A digital wallet interface for managing balances, transfers, and transactions.', 'Ongoing project'],
  ['CheapChat', cheapChat, cheapChatBg, 'https://cheapchatph.vercel.app/home', 'A web-based chat experience.'],
  ['Tutoy Tracker', debtTracker, null, 'https://tutoytracker.vercel.app/', 'A simple dashboard for tracking debts and payments.'],
  ['SkySnap', skySnap, skySnapBg, 'https://skysnapph.vercel.app/', 'Explore the SkySnap web experience.'],
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
        <div className="bento-box-label"><div className="bento-box-copy"><strong>{title}</strong>{status && <span className="project-status">{status}</span>}<p>{description}</p></div>{image && url && <a className="project-visit" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${title} website (opens in a new tab)`}>Visit site ↗</a>}</div>
      </article>)}
      {spotlightProjects.length % 2 !== 0 && (
        <article className="rotating-bento-box project-coming-soon">
          <span className="project-coming-soon-plus" aria-hidden="true">+</span>
          <h3>More projects coming soon.</h3>
          <p>There’s always something new in the works.</p>
        </article>
      )}
    </div>
  </section>;
}













