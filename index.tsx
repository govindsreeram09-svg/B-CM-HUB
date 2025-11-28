import React, { FC, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom/client';

// --- SVG ICON COMPONENTS ---
const IconWrapper: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>{children}</svg>
);

const LightbulbIcon = () => <IconWrapper><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" /></IconWrapper>;
const CogIcon = () => <IconWrapper><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69-.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22-.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" /></IconWrapper>;
const ChartLineIcon = () => <IconWrapper><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" /></IconWrapper>;
const UsersIcon = () => <IconWrapper><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></IconWrapper>;

// --- REUSABLE CARD COMPONENT ---
interface DashboardCardProps {
    title: string;
    icon: React.ReactNode;
}
const DashboardCard: FC<PropsWithChildren<DashboardCardProps>> = ({ title, icon, children }) => {
    return (
        <div className="dashboard-card" role="region" aria-label={`${title} dashboard card`}>
            <div className="card-header">
                <div className="card-icon">{icon}</div>
                <h3>{title}</h3>
            </div>
            <div className="card-content">{children}</div>
        </div>
    );
};

// --- INFOGRAPHIC COMPONENTS ---

const IdeaFunnel = () => {
    const stages = [
        { name: 'Submitted', value: 1240, color: '#e94560' },
        { name: 'In Review', value: 860, color: '#f8b400' },
        { name: 'In Development', value: 215, color: '#53a8b6' },
        { name: 'Launched', value: 45, color: '#7ed957' },
    ];
    return (
        <div className="idea-funnel">
            {stages.map((stage, index) => (
                <div key={stage.name} className="funnel-stage" style={{ '--stage-color': stage.color, '--stage-width': `${100 - index * 15}%` }}>
                    <span className="stage-name">{stage.name}</span>
                    <span className="stage-value">{stage.value.toLocaleString()}</span>
                </div>
            ))}
        </div>
    );
};

const DonutChart = () => {
    const data = [
        { name: 'AI/ML', value: 45, color: '#e94560' },
        { name: 'Sustainability', value: 25, color: '#53a8b6' },
        { name: 'Robotics', value: 20, color: '#f8b400' },
        { name: 'Quantum', value: 10, color: '#a259ff' },
    ];

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    return (
        <div className="donut-chart-container">
            <svg viewBox="0 0 200 200" className="donut-chart">
                <circle className="donut-hole" cx="100" cy="100" r={radius}></circle>
                <circle className="donut-ring" cx="100" cy="100" r={radius}></circle>
                {data.map(item => {
                    const dasharray = (item.value / 100) * circumference;
                    const strokeDasharray = `${dasharray} ${circumference}`;
                    const currentOffset = offset;
                    offset -= dasharray;
                    return (
                        <circle
                            key={item.name}
                            className="donut-segment"
                            cx="100"
                            cy="100"
                            r={radius}
                            stroke={item.color}
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={currentOffset}
                        ></circle>
                    );
                })}
                 <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="donut-center-text">$15M</text>
            </svg>
            <div className="donut-legend">
                {data.map(item => (
                    <div key={item.name} className="legend-item">
                        <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                        <span className="legend-label">{item.name} ({item.value}%)</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const MarketAdoptionChart = () => {
    const data = [10, 25, 40, 30, 60, 85];
    const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - d}`).join(' ');

    return (
        <div className="line-chart-container">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="line-chart">
                <polyline
                    fill="none"
                    stroke="var(--secondary-accent)"
                    strokeWidth="2"
                    points={points}
                />
            </svg>
            <div className="chart-labels">
                <span>6m ago</span>
                <span>Now</span>
            </div>
        </div>
    );
};

const TeamCollaboration = () => {
    const teams = [
        { name: 'Eng & Design', progress: 85, color: '#e94560' },
        { name: 'Marketing & Sales', progress: 70, color: '#53a8b6' },
        { name: 'Product & Research', progress: 92, color: '#f8b400' },
    ];
    return (
        <div className="progress-bar-container">
            {teams.map(team => (
                <div key={team.name} className="progress-item">
                    <div className="progress-label">
                        <span>{team.name}</span>
                        <span>{team.progress}%</span>
                    </div>
                    <div className="progress-bar-bg">
                        <div className="progress-bar-fg" style={{ width: `${team.progress}%`, backgroundColor: team.color }}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- MAIN APP COMPONENT ---
const App = () => {
    return (
        <>
            <style>{`
                /* General Card Styling */
                .dashboard-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 2rem;
                    padding-top: 1rem;
                }
                .dashboard-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                .dashboard-header h1 {
                    font-size: 2.5rem;
                    font-weight: 600;
                    color: var(--text-color);
                    margin: 0;
                }
                .dashboard-header p {
                    font-size: 1.1rem;
                    color: var(--text-muted);
                    margin-top: 0.5rem;
                }
                .dashboard-card {
                    background: var(--card-bg);
                    border-radius: 16px;
                    padding: 1.5rem;
                    border: 1px solid var(--border-color);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    display: flex;
                    flex-direction: column;
                }
                .dashboard-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                }
                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                    color: var(--secondary-accent);
                }
                .card-header h3 {
                    margin: 0;
                    font-size: 1.25rem;
                    color: var(--text-color);
                    font-weight: 600;
                }
                .card-icon {
                    background: var(--tertiary-accent);
                    padding: 0.5rem;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .card-content {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                /* Idea Funnel */
                .idea-funnel {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                }
                .funnel-stage {
                    width: var(--stage-width);
                    background: var(--stage-color);
                    color: #fff;
                    padding: 0.75rem 1rem;
                    border-radius: 4px;
                    display: flex;
                    justify-content: space-between;
                    font-weight: 600;
                    transition: transform 0.2s ease;
                }
                .funnel-stage:hover {
                    transform: scale(1.05);
                }
                
                /* Donut Chart */
                .donut-chart-container {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                }
                .donut-chart {
                    transform: rotate(-90deg);
                    animation: fill-donut 2s ease-out forwards;
                }
                .donut-hole { fill: var(--card-bg); }
                .donut-ring { stroke: var(--tertiary-accent); stroke-width: 20; }
                .donut-segment { stroke-width: 20; fill: transparent; stroke-linecap: round; }
                .donut-center-text { font-size: 2rem; font-weight: bold; fill: var(--text-color); transform: rotate(90deg) translate(0, -200px); }

                @keyframes fill-donut {
                    from { stroke-dasharray: 0 1000; }
                }

                .donut-legend { display: flex; flex-direction: column; gap: 0.5rem; }
                .legend-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; }
                .legend-color { width: 12px; height: 12px; border-radius: 50%; }

                /* Market Adoption Chart */
                .line-chart-container { position: relative; }
                .line-chart { width: 100%; height: 150px; }
                .line-chart polyline {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: draw-line 2s ease-out forwards;
                }
                @keyframes draw-line {
                    to { stroke-dashoffset: 0; }
                }
                .chart-labels { display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); padding: 0 0.5rem; margin-top: 0.25rem; }

                /* Team Collaboration */
                .progress-bar-container { display: flex; flex-direction: column; gap: 1.5rem; }
                .progress-item { width: 100%; }
                .progress-label { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem; font-weight: 600; }
                .progress-bar-bg { background: var(--tertiary-accent); border-radius: 8px; height: 10px; overflow: hidden; }
                .progress-bar-fg { height: 100%; border-radius: 8px; animation: fill-bar 2s ease-out forwards; transform-origin: left; }
                
                @keyframes fill-bar {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                }
                
                @media (max-width: 768px) {
                    body { padding: 1rem; }
                    .dashboard-header h1 { font-size: 2rem; }
                    .donut-chart-container { flex-direction: column; }
                }
            `}</style>

            <header className="dashboard-header" role="banner">
                <h1>Innovation Dashboard</h1>
                <p>Real-time metrics on our company's growth and creative pipeline.</p>
            </header>
            <main className="dashboard-grid">
                <DashboardCard title="Idea Funnel" icon={<LightbulbIcon />}>
                    <IdeaFunnel />
                </DashboardCard>
                <DashboardCard title="R&D Investment" icon={<CogIcon />}>
                    <DonutChart />
                </DashboardCard>
                <DashboardCard title="Market Adoption" icon={<ChartLineIcon />}>
                    <MarketAdoptionChart />
                </DashboardCard>
                <DashboardCard title="Team Collaboration" icon={<UsersIcon />}>
                    <TeamCollaboration />
                </DashboardCard>
            </main>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
