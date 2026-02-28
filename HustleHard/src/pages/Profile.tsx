import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import TopBar from '../components/layout/TopBar';
import { useProfile } from '../context/ProfileContext';
import styles from './Profile.module.css';

export default function Profile() {
    const { profile, updateProfile } = useProfile();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Local state for the modal form
    const [selectedAvatar, setSelectedAvatar] = useState(profile.selectedAvatar);
    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [handle, setHandle] = useState(profile.handle);
    const [weight, setWeight] = useState(profile.weight);

    const avatars = ['👨‍🚀', '🦊', '⚡️', '🦁'];

    const handleOpenModal = () => {
        // Reset local state to context values when opening
        setSelectedAvatar(profile.selectedAvatar);
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        setHandle(profile.handle);
        setWeight(profile.weight);
        setIsEditModalOpen(true);
    };

    const handleSave = () => {
        updateProfile({ selectedAvatar, firstName, lastName, handle, weight });
        setIsEditModalOpen(false);
    };

    return (
        <>
            <Sidebar />
            <main className="main-content">
                <TopBar
                    title="Mon Profil"
                    subTitle="Gérez vos informations personnelles"
                    isNotif={false}
                    notificationIcon={false}
                    headerButton={false}
                />

                <div className={styles.profileContainerV5}>

                    {/* Identity Card */}
                    <div className={styles.identityCardV5}>
                        <div className={styles.avatarV5}>{profile.selectedAvatar}</div>
                        <div className={styles.identityInfoV5}>
                            <h2>{profile.firstName} {profile.lastName}</h2>
                            <p>@{profile.handle}</p>
                        </div>
                        <button className={styles.btnEditV5} onClick={handleOpenModal}>
                            Modifier
                        </button>
                    </div>

                    {/* Pro Stats Row */}
                    <div className={styles.proStatsRow}>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>5</div>
                            <div className={styles.statLabel}>Streak</div>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>42</div>
                            <div className={styles.statLabel}>Séances</div>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <div className={styles.statValue}>156</div>
                            <div className={styles.statLabel}>Tâches</div>
                        </div>
                    </div>

                    {/* Personal Info List */}
                    <div className={styles.infoCardV5}>
                        <div className={styles.infoRowV5}>
                            <span className={styles.infoLabelV5}>Habitudes en cours</span>
                            <span className={styles.infoDataV5}>4</span>
                        </div>
                        <div className={styles.infoRowV5}>
                            <span className={styles.infoLabelV5}>Poids</span>
                            <span className={styles.infoDataV5}>{profile.weight} kg</span>
                        </div>
                    </div>

                    <button className={styles.btnLogoutV5}>Déconnexion</button>

                    <div style={{ textAlign: 'center', marginTop: '0.5rem', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Réalisé par Chiheb Eddine KEBBAS</span>
                    </div>

                </div>

                {/* Edit Profile Modal */}
                {isEditModalOpen && (
                    <div className={styles.modalOverlay} onClick={() => setIsEditModalOpen(false)}>
                        <div className={styles.improvedModal} onClick={e => e.stopPropagation()}>
                            <div className={styles.modalHeader}>
                                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Editer le Profil</h3>
                                <button className={styles.closeModal} onClick={() => setIsEditModalOpen(false)}>×</button>
                            </div>

                            <div className={styles.modalBody}>
                                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                    <label className={styles.labelHeading} style={{ marginBottom: '1rem', display: 'block' }}>Avatar / Bitmoji</label>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                        {avatars.map(avatar => (
                                            <div
                                                key={avatar}
                                                className={`${styles.avatarOption} ${selectedAvatar === avatar ? styles.selected : ''}`}
                                                onClick={() => setSelectedAvatar(avatar)}
                                            >
                                                {avatar}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <div className={styles.formGroup} style={{ flex: 1 }}>
                                        <label className={styles.labelHeading}>Prénom</label>
                                        <input
                                            type="text"
                                            className={styles.primaryInput}
                                            value={firstName}
                                            onChange={e => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.formGroup} style={{ flex: 1 }}>
                                        <label className={styles.labelHeading}>Nom</label>
                                        <input
                                            type="text"
                                            className={styles.primaryInput}
                                            value={lastName}
                                            onChange={e => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.labelHeading}>Pseudo</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-secondary)' }}>@</span>
                                        <input
                                            type="text"
                                            className={styles.primaryInput}
                                            style={{ paddingLeft: '30px' }}
                                            value={handle}
                                            onChange={e => setHandle(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                                    <label className={styles.labelHeading}>Poids (kg)</label>
                                    <input
                                        type="number"
                                        className={styles.primaryInput}
                                        value={weight}
                                        onChange={e => setWeight(Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className={styles.modalFooter}>
                                <button className={styles.btnSaveProgram} onClick={handleSave}>Enregistrer</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
