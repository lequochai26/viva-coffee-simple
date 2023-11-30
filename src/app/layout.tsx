import { Metadata } from "next";
import { ReactNode } from "react";

// Metadata
export const metadata: Metadata = {
    title: "Viva Coffee",
    authors: [
        { name: "Lê Quốc Hải" }
    ],
    creator: "Lê Quốc Hải"
};

// Main layout
function MainLayout({ children }: { children: ReactNode }) {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}

export default MainLayout;