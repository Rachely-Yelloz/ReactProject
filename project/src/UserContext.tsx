

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserType {
    name: string;
    id: number | null;
    isLoggedIn: boolean;
}

// יצירת ערכים דפולטיביים עבור המשתמש
const defaultUser: UserType = {
    name: '',
    id: 0,
    isLoggedIn: false,
};

// יצירת Context עם ערכים דפולטיביים
const UserContext = createContext<{ user: UserType; setUser: React.Dispatch<React.SetStateAction<UserType>> }>({
    user: defaultUser,
    setUser: () => {},
});

// הגדרת טיפוס עבור Props של UserProvider
interface UserProviderProps {
    children: ReactNode;
}

// קומפוננטת Provider
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType>(defaultUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// פונקציה לגישה ל-Context
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};