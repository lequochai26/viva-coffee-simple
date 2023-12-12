'use client'

import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import ManagementPage from "./components/management_page/ManagementPage";
import User from "./interfaces/User";

function App() {
    // States:
    const [ user, setUser ] = useState<User | undefined>(undefined);

    // Event handlers:
    function login(user: User) {
        setUser(user);
    }

    async function logout() {
        setUser(undefined);
    }

    // View:
    return (
        <div className="block widthFitParent heightFitParent">
            {
                (!user)
                ? <LoginPage onLogin={login} />
                : <ManagementPage user={user} onLogout={logout} />
            }
        </div>
    );
}

export default App;