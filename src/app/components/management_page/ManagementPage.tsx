import Image from "next/image";
import { useState } from "react";
import Button from "../Button";
import User from "../../interfaces/User";
import UserManagement from "../usermanagement_page/UserManagement";
import DefaultContentAreaViewPortContent from "./DefaultContentAreaViewPortContent";
import MenuBar from "./menubar/MenuBar";
import ContentArea from "./content_area/ContentArea";

// Interfaces:
interface ManagementPageProps {
    user: User;
    onLogout?(): void;
}

// Main component::
export default function ManagementPage({ user, onLogout }: ManagementPageProps) {
    // States:
    const [ showMenuBar, setShowMenuBar ] = useState<boolean>(true);
    const [ viewPortContent, setViewPortContent ] = useState<JSX.Element>(
        <DefaultContentAreaViewPortContent />
    );

    // Event handlers:
    function swapShowMenuBar() {
        setShowMenuBar(!showMenuBar);
    }

    function showUserManagement() {
        setViewPortContent(
            <UserManagement />
        );
    }

    // View:
    return (
        <div className="block widthFitParent heightFitParent">
            {/* Menu bar */}
            <MenuBar user={user} onLogout={onLogout} show={showMenuBar} onUserManagementMenuClick={showUserManagement} />

            {/* Content area */}
            <ContentArea menuBarShow={showMenuBar} viewPortContent={ viewPortContent } onMenuButtonClick={swapShowMenuBar} />
        </div>
    )
}