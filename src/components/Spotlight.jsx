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

const PAGE_SIZE = 4;
// Lead with live projects that show a range of visual styles and business uses.
const projectOrder = [2, 1, 0, 3, 8, 4, 6, 7, 5];
const pageCount = Math.ceil(projectOrder.length / PAGE_SIZE);

export default function Spotlight({ active, setActive }) {
  const position = Math.max(0, projectOrder.indexOf(active));
  const page = Math.floor(position / PAGE_SIZE);
  const visibleIndices = projectOrder.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActive((current) => {
        const start = page * PAGE_SIZE;
        const items = projectOrder.slice(start, start + PAGE_SIZE);
        const clockwise = [0, 1, 3, 2]
          .filter((position) => position < items.length)
          .map((position) => items[position]);
        const sequence = window.matchMedia('(max-width:560px)').matches ? items : clockwise;
        return sequence[(sequence.indexOf(current) + 1) % sequence.length];
      });
    }, ROTATION_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [active, page, setActive]);

  const changePage = (nextPage) => {
    setActive(projectOrder[nextPage * PAGE_SIZE]);
  };

  return (
    <section className="work section-shell" id="work">
      <div className="work-heading"><span className="eyebrow">FEATURED PROJECTS</span></div>
      <h2 className="featured-projects-title">Projects.</h2>
      <div className={`rotating-bento active-box-${visibleIndices.indexOf(active)}`}>
        {visibleIndices.map((index) => {
          const [title, image, background, url, description, status] = spotlightProjects[index];
          return (
            <article key={title} className={`rotating-bento-box ${active === index ? 'expanded' : ''}`} style={{ backgroundImage: background ? `url(${background})` : undefined }}>
              {active === index && <span className="rotation-track" aria-hidden="true"><span key={active} className="rotation-progress" style={{ animationDuration: `${ROTATION_DURATION_MS}ms` }} /></span>}
              <button type="button" className="bento-select" onClick={() => setActive(index)} aria-pressed={active === index} aria-label={`Enlarge ${title}`} />
              <span className="bento-box-number">PROJECT / {String(projectOrder.indexOf(index) + 1).padStart(2, '0')}</span>
              <img src={image} alt={`${title} project preview`} />
              <div className="bento-box-label">
                <div className="bento-box-copy"><strong>{title}</strong>{status && <span className="project-status">{status}</span>}<p>{description}</p></div>
                {url && <a className="project-visit" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${title} website (opens in a new tab)`}>Visit site ↗</a>}
              </div>
            </article>
          );
        })}
      </div>
      <nav className="project-pagination" aria-label="Project pages">
        <button type="button" onClick={() => changePage(page - 1)} disabled={page === 0} aria-label="Previous project page">←</button>
        {Array.from({ length: pageCount }, (_, index) => (
          <button type="button" key={index} onClick={() => changePage(index)} aria-label={`Project page ${index + 1}`} aria-current={page === index ? 'page' : undefined}>{index + 1}</button>
        ))}
        <button type="button" onClick={() => changePage(page + 1)} disabled={page === pageCount - 1} aria-label="Next project page">→</button>
      </nav>
    </section>
  );
}
