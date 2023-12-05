'use client'

import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import ManagementPage from "./components/management_page/ManagementPage";
import User from "./interfaces/User";

function App() {
    // States:
    const [ user, setUser ] = useState<User | undefined>(undefined);

    // Event handlers:
    async function login(username: string, password: string): Promise<void> {
        try {
            // Sending HTTP request for logging-in
            var response: Response = await fetch(
                "/login",
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            username: username,
                            password: password
                        }
                    )
                }
            );

            // Parse response's body to json
            const { success, message, user }: any = await response.json();

            // If logged-in successully
            if (success) {
                setUser(user);
            }
            // If login failed
            else {
                alert(message);
            }
        }
        catch (error: any) {
            alert("Có lỗi xảy ra trong quá trình xử lý!");
            console.error(error);
        }
    }

    async function logout() {
        setUser(undefined);
    }

    // View:
    return (
        <div className="block widthFitParent heightFitParent">
            {
                (!user)
                ? <LoginPage onSubmit={login} />
                : <ManagementPage user={user} onLogout={logout} />
            }
        </div>
    );
}

export default App;