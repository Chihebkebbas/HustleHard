import { createContext, useContext, useState, type ReactNode } from 'react';

export interface ProfileDetails {
    selectedAvatar: string;
    firstName: string;
    lastName: string;
    handle: string;
    weight: number;
}

interface ProfileContextType {
    profile: ProfileDetails;
    updateProfile: (updates: Partial<ProfileDetails>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<ProfileDetails>({
        selectedAvatar: '👨‍🚀',
        firstName: 'Chiheb',
        lastName: 'Kebbas',
        handle: 'chiheb_hustle',
        weight: 75,
    });

    const updateProfile = (updates: Partial<ProfileDetails>) => {
        setProfile(prev => ({ ...prev, ...updates }));
    };

    return (
        <ProfileContext.Provider value={{ profile, updateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    const context = useContext(ProfileContext);
    // eslint-disable-next-line react-refresh/only-export-components
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
}
