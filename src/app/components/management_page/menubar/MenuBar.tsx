import User from "@/app/interfaces/User";
import UserArea from "./UserArea";
import MenuItem from "./MenuItem";

// Interfaces:
interface MenuBarProps {
    user: User;
    onLogout?(): void;
    show: boolean;
    onUserManagementMenuClick?(): void;
}

// Main component:
export default function MenuBar({ user, onLogout, show, onUserManagementMenuClick }: MenuBarProps) {
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