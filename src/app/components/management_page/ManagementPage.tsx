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
import AddUserBox from "./AddUserBox";
import EditUserBox from "./EditUserBox";
import ItemDataRow from "./interfaces/ItemDataRow";
import AddItemBox from "./AddItemBox";
import EditItemBox from "./EditItemBox";
import ItemTypeDataRow from "./interfaces/ItemTypeDataRow";
import AddItemTypeBox from "./AddItemTypeBox";
import EditItemTypeBox from "./EdiItemTypeBox";
import OrderDataRow from "./interfaces/OrderDataRow";

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
        <DefaultContentAreaViewPortContent />
    );

    // Event handlers:
    function swapShowMenuBar() {
        setShowMenuBar(!showMenuBar);
    }

    function showUserManagement() {
        setViewPortContent(
            <ManagementPanel<UserDataRow>
                key="userManagementPanel"
                config={
                    {
                        routeHandler: "/management/user2",
                        table: {
                            columns: [
                                ["username", "Tên người dùng"],
                                ["fullName", "Họ và tên"],
                                ["permission", "Quyền"]
                            ]
                        },
                        editable: true,
                        viewable: false
                    }
                }
                AddScreen={AddUserBox}
                EditScreen={EditUserBox}
                ViewScreen={undefined}
                user={user}
            />
        );
    }

    function showItemManagement() {
        setViewPortContent(
            <ManagementPanel<ItemDataRow>
                key="itemManagementPanel"
                config={
                    {
                        routeHandler: "/management/item",
                        table: {
                            columns: [
                                ["id", "Mã"],
                                ["name", "Tên"],
                                ["typeName", "Loại"],
                                ["price", "Đơn giá"]
                            ]
                        },
                        editable: true,
                        viewable: false
                    }
                }
                AddScreen={AddItemBox}
                EditScreen={EditItemBox}
                ViewScreen={undefined}
                user={user}
            />
        );
    }

    function showItemTypeManagement() {
        setViewPortContent(
            <ManagementPanel<ItemTypeDataRow>
                key="itemTypeManagementPanel"
                config={
                    {
                        routeHandler: "/management/itemtype",
                        table: {
                            columns: [
                                ["id", "Mã loại sản phẩm"],
                                ["name", "Tên loại sản phẩm"]
                            ]
                        },
                        editable: true,
                        viewable: false
                    }
                }
                AddScreen={AddItemTypeBox}
                EditScreen={EditItemTypeBox}
                ViewScreen={undefined}
                user={user}
            />
        );
    }

    function showOrderManagement() {
        setViewPortContent(
            <ManagementPanel<OrderDataRow>
                key="orderManagementPanel"
                config={
                    {
                        routeHandler: "/management/order",
                        table: {
                            columns: [
                                ["id", "Mã"],
                                ["date", "Ngày lập"],
                                ["totalPrice", "Tổng thành tiền"],
                                ["createdByFullName", "Lập bởi"]
                            ]
                        },
                        editable: false,
                        viewable: true
                    }
                }
                AddScreen={undefined}
                EditScreen={undefined}
                ViewScreen={undefined}
                user={user}
            />
        );
    }

    // View:
    return (
        <div className="block widthFitParent heightFitParent">
            {/* Menu bar */}
            <MenuBar
                user={user}
                onLogout={onLogout}
                show={showMenuBar}
                onUserManagementMenuClick={showUserManagement}
                onItemManagementMenuClick={showItemManagement}
                onItemTypeManagementMenuClick={showItemTypeManagement}
                onOrderManagementMenuClick={showOrderManagement}
            />

            {/* Content area */}
            <ContentArea menuBarShow={showMenuBar} viewPortContent={ viewPortContent } onMenuButtonClick={swapShowMenuBar} />
        </div>
    )
}