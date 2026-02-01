import styles from './TopBar.module.css';
import CtaButton from "../ui/CtaButton.tsx";

type TopBarProps = {
    notificationIcon : boolean;
    isNotif? : boolean,
    goalsViewToggle? : boolean,
    username : string,
    headerButton? : boolean,
    buttonClassName: string,
    buttonText: string,
    svgPath?: string,
}

export default function TopBar(
    { notificationIcon = true, isNotif = false, username, buttonClassName = 'default', buttonText, svgPath = '', headerButton = true, goalsViewToggle = false}: TopBarProps
) {

    const date = new Date();

    const fomatted = new Intl.DateTimeFormat("fr-FR", {
        weekday: "long",
        month: "long",
        day: "2-digit",
    }).format(date);

    const today = fomatted.charAt(0).toUpperCase() + fomatted.slice(1);



    return (
        <header className={styles.header}>
            <div className={styles.greeting}>
                <h1>Bonjour, {username}</h1>
                <p id="current-date">{today}</p>
            </div>

            <div className={styles.headerActions}>
                {
                    notificationIcon && (
                        <div className={styles.notificationBtn}>
                            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                                </path>
                            </svg>
                            {
                                isNotif && <div className={styles.notifBadge}></div>
                            }

                        </div>
                    )
                }

                {
                    goalsViewToggle && (
                        <div className={styles.viewToggle}>
                            <button className={`${styles.toggleBtn} active`.trim()} title="Vue Cartes">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                            </button>
                            <button className={styles.toggleBtn} title="Vue Gantt">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     stroke-width="2">
                                    <line x1="8" y1="6" x2="21" y2="6"></line>
                                    <line x1="8" y1="12" x2="21" y2="12"></line>
                                    <line x1="8" y1="18" x2="21" y2="18"></line>
                                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    )
                }

                {
                    headerButton && (
                        <CtaButton buttonClassName={buttonClassName} buttonText={buttonText} svgPath={svgPath}/>
                    )
                }

            </div>
        </header>
    )
}