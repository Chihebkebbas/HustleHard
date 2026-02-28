import { NavLink } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import styles from './Sidebar.module.css';

type SidebarProps = {
    className?: string;
};

export default function Sidebar({ className = '' }: SidebarProps) {
    const { profile } = useProfile();


    return (
        <aside className={`${styles.sidebar} ${className}`.trim()}>
            <div className={styles.windowControls}>
                <div className={styles.logoContainer} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="logoGradient" x1="0" y1="0" x2="24" y2="24"
                                gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FF6B35" />
                                <stop offset="1" stopColor="#FF2D55" />
                            </linearGradient>
                        </defs>
                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#logoGradient)" stroke="white"
                            strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    <div className={styles.logoText}>
                        <span className={styles.logoPrimary}>Hustle</span>
                        <span className={styles.logoAccent}>Hard</span>
                    </div>
                </div>
            </div>

            <div className={styles.navGroup}>
                <h3 className={styles.navSectionTitle}>Quotidien</h3>
                <nav className={styles.navMenu}>
                    <NavLink to="/dashboard" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                        <svg className={styles.navItemIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                            </path>
                        </svg>
                        Dashboard
                    </NavLink>
                    <NavLink to="/tasks" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                        <svg className={styles.navItemIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4">
                            </path>
                        </svg>
                        Tâches
                    </NavLink>
                    <NavLink to="/goals" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                        <svg className={styles.navItemIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        Objectifs
                    </NavLink>
                    <NavLink to="/habits" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                        <svg className={styles.navItemIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 01-2-2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                            </path>
                        </svg>
                        Habitudes
                    </NavLink>
                </nav>
            </div>

            <div className={styles.navGroup}>
                <h3 className={styles.navSectionTitle}>Performance</h3>
                <nav className={styles.navMenu}>
                    <NavLink to="/programs" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                        <svg className={styles.navItemIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                        </svg>
                        Programmes
                    </NavLink>
                    <NavLink to="/analysis" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                        <svg className={styles.navItemIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 00-1.423 1.423z">
                            </path>
                        </svg>
                        Analyse IA
                    </NavLink>
                    <NavLink to="/history" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                        <svg className={styles.navItemIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01">
                            </path>
                        </svg>
                        Historique
                    </NavLink>
                </nav>
            </div>

            <NavLink to="/profile" className={styles.sidebarProfile}>
                <div className={styles.profileAvatar}>{profile.selectedAvatar}</div>
                <div className={styles.profileInfo}>
                    <span className={styles.profileName}>{profile.firstName} {profile.lastName[0] || ''}.</span>
                    <span className={styles.profileRole}>Modifier le profil</span>
                </div>
            </NavLink>
        </aside>
    )
}