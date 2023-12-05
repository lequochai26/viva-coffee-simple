import Image from "next/image";
import { useState } from "react";
import Button from "../Button";
import User from "../../interfaces/User";
import UserManagement from "../usermanagement_page/UserManagement";
import DefaultContentAreaViewPortContent from "./DefaultContentAreaViewPortContent";
import MenuBar from "./menubar/MenuBar";
import ContentArea from "./content_area/ContentArea";
import ManagementPanel from "../management_panel/ManagementPanel";
import UserDataRow from "./interfaces/UserDataRow";

// Interfaces:
interface ManagementPageProps {
    user: User;
    onLogout?(): void;
}

// Main component:
export default function ManagementPage({ user, onLogout }: ManagementPageProps) {
    // States:
    const [ showMenuBar, setShowMenuBar ] = useState<boolean>(true);
    const [ viewPortContent, setViewPortContent ] = useState<JSX.Element>(
        <ManagementPanel<UserDataRow>
            config={
                {
                    routeHandler: "/management/user2",
                    table: {
                        columns: [
                            ["username", "Tên người dùng"],
                            ["fullName", "Họ và tên"],
                            ["permission", "Quyền"]
                        ]
                    }
                }
            }
            AddScreen={undefined}
            EditScreen={undefined}
        />
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