import Image from "next/image";
import { useState } from "react";
import Button from "./Button";
import User from "../interfaces/User";
import UserManagement from "./UserManagement";

// Interfaces:
interface ManagementPageProps {
    user: User;
    onLogout?(): void;
}

interface MenuBarProps {
    user: User;
    onLogout?(): void;
    show: boolean;
    onUserManagementMenuClick?(): void;
}

interface UserAreaProps {
    user: User;
    onLogout?(): void;
}

interface MenuItemProps {
    iconSrc: string;
    title: string;
    onClick?(): void;
    className?: string;
}

interface ContentAreaProps {
    menuBarShow: boolean;
    onMenuButtonClick?(): void;
    viewPortContent: JSX.Element;
}

interface ContentAreaHeaderProps {
    menuBarShow: boolean;
    onMenuButtonClick?(): void;
}

interface ContentAreaViewPortProps {
    content: JSX.Element;
}

// Page component:
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

// Components:
function MenuBar({ user, onLogout, show, onUserManagementMenuClick }: MenuBarProps) {
    // View:
    return (
        <div className={`${show ? "inlineBlock": "none"} width200px heightFitParent borderBlackThin verticalAlignTop`}>
            {/* User area */}
            <UserArea user={user} onLogout={onLogout} />

            {/* Management menu items */}
            {
                user.permission === "ADMIN"
                &&
                <MenuItem iconSrc="/user.png" title="Quản lý người dùng" onClick={onUserManagementMenuClick} />
            }

            <MenuItem iconSrc="/coffee.png" title="Quản lý sản phẩm" className={user.permission === "ADMIN" ? "borderTopNone": ""} />

            <MenuItem iconSrc="/item-type.png" title="Quản lý loại sản phẩm" className="borderTopNone" />

            <MenuItem iconSrc="/order.png" title="Quản lý đơn hàng" className="borderTopNone" />
        </div>
    )
}

function UserArea({ user, onLogout }: UserAreaProps) {
    // States:
    const [ hovering, setHovering ] = useState<boolean>(false);

    // Event handlers:
    function onMouseEnter() {
        setHovering(true);
    }

    function onMouseLeave() {
        setHovering(false);
    }

    // View:
    return (
        <div className="block widthFitParent heightFitContent textAlignCenter marginBottom25px" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            
            <table className="block widthFitParent heightFitContent">

                <tbody>

                    <tr>
                        {/* Account icon */}
                        <td className="padding5px">
                            <Image src="/account.png" width={40} height={40} alt="Account icon" className="verticalAlignMiddle" />
                        </td>

                        {/* User's fullname */}
                        <td>
                            <label className="fontWeightBold">
                                { user.fullName } [{ user.permission }]
                            </label>
                        </td>
                    </tr>

                </tbody>
                
            </table>


            {
                (
                    hovering
                    &&
                    <Button type="normal" value="Đăng xuất" className="fontSize12px" onClick={onLogout} />
                )
            }
        </div>
    )
}

function MenuItem({ iconSrc, title, onClick, className }: MenuItemProps) {
    // View:
    return (
        <div className={`borderBlackThin widthFitParent heightFitContent cursorPointer paddingTop5px paddingBottom5px borderLeftNone borderRightNone ${className}`} onClick={onClick}>
            
            <table className="block widthFitParent heightFitContent">

                <tbody>

                    <tr>
                        {/* Icon */}
                        <td>
                            <Image src={iconSrc} width={30} height={30} alt="User icon" className="inlineBlock verticalAlignMiddle margin2px cursorInherit" />
                        </td>

                        {/* Title */}
                        <td>
                            <label className="textAlignCenter fontWeightBold cursorInherit">
                                { title }
                            </label>
                        </td>
                    </tr>

                </tbody>

            </table>

        </div>
    )
}

function ContentArea({ menuBarShow, viewPortContent, onMenuButtonClick }: ContentAreaProps) {
    // View:
    return (
        <div className="inlineBlock heightFitParent verticalAlignTop" style={{ width: (menuBarShow ? 'calc(100% - 200px)' : "100%") }}>
            {/* Header */}
            <ContentAreaHeader menuBarShow={menuBarShow} onMenuButtonClick={onMenuButtonClick} />

            {/* Viewport */}
            <ContentAreaViewPort
                content={viewPortContent}
            />
        </div>
    );
}

function ContentAreaHeader({ menuBarShow, onMenuButtonClick }: ContentAreaHeaderProps) {
    return (
        <div className={`block borderBlackThin ${menuBarShow ? "borderLeftNone": ""} widthFitParent height50px paddingTop5px paddingBottom5px`}>
            {/* Ruler */}
            <div className="ruler"></div>

            {/* Menubar button */}
            <Image src="/list.png" width={35} height={35} alt="List icon" className="inlineBlock marginLeft12px cursorPointer verticalAlignMiddle" onClick={onMenuButtonClick} />
        </div>
    )
}

function ContentAreaViewPort({ content }: ContentAreaViewPortProps) {
    return (
        <div className="block widthFitParent" style={{ height: 'calc(100% - 50px)' }}>
            { content }
        </div>
    )
}

function DefaultContentAreaViewPortContent() {
    return (
        <div className="widthFitParent heightFitParent textAlignCenter">
            {/* Ruler */}
            <div className="ruler"></div>

            {/* Content */}
            <div className="inlineBlock widthFitParent heightFitContent verticalAlignMiddle">
                <h1 className="fontWeightNormal">
                    Xin chào!
                </h1>

                <p>
                    Vui lòng chọn vào một trong các menu bên trái để truy cập đến giao diện quản lý mong muốn.
                </p>

                <p>
                    Chúc bạn có ngày làm việc vui vẻ và tràn đầy năng lượng
                </p>
            </div>
        </div>
    )
}