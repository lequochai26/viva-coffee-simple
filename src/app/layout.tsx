import { Metadata } from "next";
import { ReactNode } from "react";
import { quicksand } from "./fonts";
import './globals.css'

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
            <body className="noMargin noPadding">
                <div className={`${quicksand.className} block widthFitParent heightFitScreen`}>
                    {children}
                </div>
            </body>
        </html>
    )
}

export default MainLayout;