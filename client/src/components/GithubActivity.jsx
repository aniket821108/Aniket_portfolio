import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  GitCommit,
  GitFork,
  Star,
  ExternalLink,
  Code2,
  Activity,
  FolderGit2,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import GlassCard from './ui/GlassCard';

const GITHUB_USERNAME = 'aniket821108';

const FALLBACK_REPOS = [
  {
    id: 1,
    name: 'Indilex',
    description:
      'Indian Legal Event Extraction Dataset & Benchmark over 762+ High Court judgments benchmarking 4 open-source LLMs.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/aniket821108/Indilex',
    updated_at: '2026-11-05T12:00:00Z',
  },
  {
    id: 2,
    name: 'Aerial-LandCover-Segmentation-Mizoram',
    description:
      'Unsupervised Domain Adaptation with DeepLabV3+ & GDAL Geospatial Engine on LoveDA benchmark for rural Mizoram.',
    language: 'Jupyter Notebook',
    stargazers_count: 0,
    forks_count: 0,
    html_url:
      'https://github.com/aniket821108/Aerial-LandCover-Segmentation-Mizoram',
    updated_at: '2026-11-04T10:00:00Z',
  },
  {
    id: 3,
    name: 'ecommerce-churn-prediction',
    description:
      'Production MERN microservices platform with integrated Python ML customer churn prediction engine.',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/aniket821108/ecommerce-churn-prediction',
    updated_at: '2026-11-01T12:39:00Z',
  },
  {
    id: 4,
    name: 'Aniket_portfolio',
    description:
      'Modern high-performance developer portfolio with Three.js 3D hero, glassmorphic UI, and Vite/React.',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    html_url: 'https://github.com/aniket821108/Aniket_portfolio',
    updated_at: '2026-11-11T03:00:00Z',
  },
];

const LANG_COLORS = {
  Python: 'bg-blue-400',
  JavaScript: 'bg-yellow-400',
  'Jupyter Notebook': 'bg-orange-400',
  CSS: 'bg-indigo-400',
  HTML: 'bg-red-400',
  'C++': 'bg-pink-400',
};

export default function GithubActivity() {
  const { ref, inView } = useScrollAnimation();
  const [profile, setProfile] = useState({
    login: GITHUB_USERNAME,
    public_repos: 12,
    followers: 2,
    following: 7,
  });
  const [repos, setRepos] = useState(FALLBACK_REPOS);
  const [latestEvent, setLatestEvent] = useState({
    repo: 'aniket821108/ecommerce-churn-prediction',
    date: 'Recently active',
    type: 'PushEvent',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Fetch user profile
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data) {
          setProfile({
            login: data.login,
            public_repos: data.public_repos ?? 12,
            followers: data.followers ?? 2,
            following: data.following ?? 7,
          });
        }
      })
      .catch(() => {});

    // 2. Fetch public repos
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          // Filter out forks or keep top repositories with descriptions
          const validRepos = data.slice(0, 4);
          setRepos(validRepos);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    // 3. Fetch latest activity event
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const push = data.find((e) => e.type === 'PushEvent') || data[0];
          if (push) {
            const timeAgo = formatTimeAgo(new Date(push.created_at));
            setLatestEvent({
              repo: push.repo.name,
              date: timeAgo,
              type: push.type,
            });
          }
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  function formatTimeAgo(date) {
    const diff = Math.floor((new Date() - date) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString();
  }

  return (
    <div ref={ref} className="mt-20 pt-10 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs text-cyan-accent tracking-wider uppercase">
              Live GitHub Telemetry
            </span>
          </div>
          <h3 className="font-display text-2xl font-bold text-text-primary flex items-center gap-2.5">
            <Github size={24} className="text-accent-light" />
            Open Source & Repositories
          </h3>
        </div>

        {/* Profile Snapshot Badge */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 glass px-4 py-2 rounded-xl text-xs font-mono text-text-secondary">
            <span className="flex items-center gap-1.5">
              <FolderGit2 size={14} className="text-accent-light" />
              <strong className="text-text-primary">{profile.public_repos}</strong>{' '}
              repos
            </span>
            <span className="w-1 h-1 rounded-full bg-border-light" />
            <span className="flex items-center gap-1.5">
              <Activity size={14} className="text-cyan-accent" />
              <span className="text-text-muted">Latest push:</span>
              <span className="text-emerald-400">{latestEvent.date}</span>
            </span>
          </div>

          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono bg-accent/15 text-accent-light hover:bg-accent/25 border border-accent/30 transition-all duration-300"
          >
            <span>Follow</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </motion.div>

      {/* Grid of Live Repos */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {repos.map((repo, i) => {
          const langColor =
            LANG_COLORS[repo.language] || 'bg-gray-400';

          return (
            <motion.a
              key={repo.id || repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
              className="glass p-5 rounded-xl hover:border-accent/40 group flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_25px_rgba(124,90,240,0.12)] relative"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Code2 size={16} className="text-accent-light flex-shrink-0" />
                    <h4 className="font-display font-semibold text-sm text-text-primary group-hover:text-accent-light transition-colors line-clamp-1">
                      {repo.name}
                    </h4>
                  </div>
                  <ExternalLink
                    size={12}
                    className="text-text-muted group-hover:text-accent-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
                  />
                </div>

                <p className="font-body text-xs text-text-secondary line-clamp-3 mb-4 leading-relaxed">
                  {repo.description || 'Public GitHub repository by Aniket Kumar.'}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pt-3 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${langColor}`} />
                  <span>{repo.language || 'Code'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-1">
                    <Star size={11} className="text-amber-400/80" />
                    <span>{repo.stargazers_count ?? 0}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={11} />
                    <span>{repo.forks_count ?? 0}</span>
                  </span>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
