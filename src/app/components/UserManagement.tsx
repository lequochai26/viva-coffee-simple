import { useEffect, useState } from "react";
import Button, { ButtonProps } from "./Button";
import InputField from "./InputField";
import User from "../interfaces/User";
import FixedScreen from "./FixedScreen";
import SelectField from "./SelectField";

// Interfaces:
interface HeaderProps {
    searchKeyword?: string;
    onSearchKeywordChange?(event: any): void;
    onSearchButtonClick?(): void;
    onReloadButtonClick?(): void;
    onAddButtonClick?(): void;
}

interface UserTableProps {
    users: User[];
}

interface UserTableHeaderProps {

}

interface UserTableRowProps {
    user: User
}

interface AlterUserBoxProps {
    onCancel?(): void;
    afterAlter?(): void;
}

// Main component:
export default function UserManagement() {
    // States:
    const [ users, setUsers ] = useState<User[]>([]);
    const [ searchKeyword, setSearchKeyword ] = useState<string>("");
    const [ fixedScreenContent, setFixedScreenContent ] = useState<JSX.Element | undefined>(undefined);
    const [ selectedRows, setSelectedRows ] = useState<{ [index: string]: boolean }>({});

    // Operations:
    async function load(): Promise<void> {
        // Sending HTTP request and response receiving
        const response: Response = await fetch(
            "/management/user",
            {
                method: "GET",
                headers: [
                    ["getMethod", "GETALL"]
                ],
            }
        );

        // Parse response's body to json
        const body: any = await response.json();

        // Set Users by body's result
        setUsers(body.result);
    }

    async function loadByKeyword(): Promise<void> {
        try {
            // Sending HTTP request and receive response
            const response: Response = await fetch(
                `/management/user?searchKeyword=${searchKeyword}`,
                {
                    method: "GET",
                    headers: [
                        ["getMethod", "GETBYKEYWORD"],
                    ]
                }
            );

            // Parse response's body to json
            const body: any = await response.json();

            // Set users from body's result
            setUsers(body.result);
        }
        catch (error: any) {
            alert("Đã có lỗi xảy ra trong quá trình gửi yêu cầu!");
            console.error(error);
        }
    }

    function closeFixedScreen() {
        setFixedScreenContent(undefined);
    }

    function showAddUserBox() {
        setFixedScreenContent(
            <AddUserBox onCancel={closeFixedScreen} afterAlter={afterAlterData} />
        );
    }

    // Effects:
    useEffect(
        function () {
            load().catch(
                function (error: any) {
                    alert("Đã có lỗi xảy ra trong quá trình tải dữ liệu!");
                    console.error(error);
                }
            )
        }, []
    );

    // Event handlers:
    function onSearchKeyWordChange({ target }: any) {
        setSearchKeyword(target.value);
    }

    function afterAlterData() {
        // Close fixed screen
        setFixedScreenContent(undefined);

        // Reload data
        load();
    }

    // View:
    return (
        <>
            {/* Fixed screen */}
            <FixedScreen content={fixedScreenContent} />

            {/* User management */}
            <div className="block widthFitParent heightFitParent">
                {/* Header */}
                <Header searchKeyword={searchKeyword} onSearchKeywordChange={onSearchKeyWordChange} onSearchButtonClick={loadByKeyword} onReloadButtonClick={load} onAddButtonClick={showAddUserBox} />

                {/* User table */}
                <div className="block widthFitParent" style={{ height: 'calc(100% - 37px)', overflow: 'scroll' }}>
                    <UserTable users={users} />
                </div>
            </div>
        </>
    )
}

// Components:
function Header({ searchKeyword, onSearchKeywordChange, onSearchButtonClick, onReloadButtonClick, onAddButtonClick }: HeaderProps) {
    // View:
    return (
        <div className="block widthFitParent height37px borderBlackThin borderTopNone">
            {/* Ruler */}
            <div className="ruler"></div>

            {/* Add button */}
            <LocalButton type="normal" value="Thêm" className="inlineBlock verticalAlignMiddle marginLeft10px" onClick={onAddButtonClick} />

            {/* Remove button */}
            <LocalButton type="normal" value="Xóa" className="inlineBlock verticalAlignMiddle marginLeft10px" />

            {/* Search input field */}
            <InputField type="text" name="searchKeyword" value={searchKeyword} placeholder="Tìm kiếm" onChange={onSearchKeywordChange} className="marginLeft10px fontSize12px borderBlackThin borderRadius5px width350px" />

            {/* Search button */}
            <LocalButton type="normal" value="Tìm kiếm" className="inlineBlock verticalAlignMiddle marginLeft10px" onClick={onSearchButtonClick} />

            {/* Reload button */}
            <LocalButton type="normal" value="Tải lại" className="inlineBlock verticalAlignMiddle marginLeft10px" onClick={onReloadButtonClick} />
        </div>
    );
}

function LocalButton({ type, value, className, onClick }: ButtonProps) {
    // View:
    return (
        <Button type={type} value={value} className={`fontSize12px ${className}`} onClick={onClick} />
    );
}

function UserTable({ users }: UserTableProps) {
    // View:
    return (
        <table className="widthFitParent heightFitContent">
            {/* Header */}
            <UserTableHeader />

            {/* Body */}
            <tbody>
                {
                    users.map(
                        function (user: User) {
                            return (
                                <UserTableRow key={user.username} user={user} />
                            );
                        }
                    )
                }
            </tbody>
        </table>
    );
}

function UserTableHeader() {
    // View:
    return (
        <thead className="fontWeightBold">
            <tr>
                <td className="textAlignLeft">
                    <input type="checkbox" />
                </td>

                <td>
                    <label>
                        Tên người dùng
                    </label>
                </td>

                <td>
                    <label>
                        Họ và tên
                    </label>
                </td>

                <td>
                    <label>
                        Quyền
                    </label>
                </td>

                <td className="textAlignRight">
                    <label className="marginRight5px">
                        Hành động
                    </label>
                </td>
            </tr>
        </thead>
    );
}

function UserTableRow({ user }: UserTableRowProps) {
    return (
        <tr>
            <td className="textAlignLeft">
                <input type="checkbox" />
            </td>

            <td>
                <label>
                    { user.username }
                </label>
            </td>

            <td>
                <label>
                    { user.fullName }
                </label>
            </td>

            <td>
                <label>
                    { user.permission }
                </label>
            </td>

            <td className="textAlignRight">
                <LocalButton type="normal" value="Sửa" className="marginRight5px" />
                <LocalButton type="normal" value="Xóa" className="marginRight5px" />
            </td>
        </tr>
    );
}

function AddUserBox({ onCancel, afterAlter }: AlterUserBoxProps) {
    // States:
    const [ fields, setFields ] = useState<{username: string, password: string, fullName: string, permission: string}>({username: "", password: "", fullName: "", permission: "EMPLOYEE"});
    const [ message, setMessage ] = useState<string | undefined>(undefined);

    // Event handlers:
    function onFieldChange({ target }: any) {
        setFields({ ...fields, [target.name]: target.value });
    }

    async function onSubmit(event: any) {
        // Default preventing
        event.preventDefault();

        try {
            // Sending HTTP Request and receiving response
            const response: Response = await fetch(
                "/management/user",
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            username: fields.username,
                            password: fields.password,
                            fullName: fields.fullName,
                            permission: fields.permission
                        }
                    )
                }
            );

            // Parse response's body to json
            const body: any = await response.json();

            // Failed case
            if (!body.success) {
                setMessage(body.message);
            }
            // Successfully case
            else {
                if (afterAlter) {
                    afterAlter();
                }
            }
        }
        catch (error: any) {
            alert("Đã có lỗi xảy ra trong quá trình gửi yêu cầu!");
            console.error(error);
        }
    }

    // View:
    return (
        <div className="inlineBlock widthFitContent heightFitContent backgroundWhite borderBlackThin borderRadius5px padding10px paddingLeft25px paddingRight25px verticalAlignMiddle">
            
            {/* Login form */}
            <form onSubmit={onSubmit}>

                {/* Username input field */}
                <p>
                    <InputField type="text" name="username" value={fields.username} placeholder="Tên người dùng" onChange={onFieldChange} required={true} />
                </p>

                {/* Password input field */}
                <p>
                    <InputField type="password" name="password" value={fields.password} placeholder="Mật khẩu" onChange={onFieldChange} required={true} />
                </p>

                {/* Full name input field */}
                <p>
                    <InputField type="text" name="fullName" value={fields.fullName} placeholder="Họ và tên" onChange={onFieldChange} required={true} />
                </p>

                {/* Permission input field */}
                <p>
                    <SelectField name="permission" value={["EMPLOYEE", "ADMIN"]} selecting={fields.permission} placeholder="Quyền" onChange={onFieldChange} />
                </p>

                {/* Submit / cancel area */}
                <p>
                    <Button type="submit" value="Thêm" className="margin5px" />
                    <Button type="normalInForm" value="Hủy" className="margin5px" onClick={onCancel} />
                </p>

                {/* Message displaying */}
                {
                    message
                    &&
                    <p className="textColorRed">
                        {message}
                    </p>
                }

            </form>

        </div>
    )
}

function EditUserBox({ onCancel, afterAlter }: AlterUserBoxProps) {

}