import { useEffect, useState } from "react";
import Button, { ButtonProps } from "../Button";
import InputField from "../InputField";
import User from "../../interfaces/User";
import FixedScreen from "../FixedScreen";
import SelectField from "../SelectField";
import Header from "./Header";
import UserTable from "./user_table/UserTable";
import AddUserBox from "./AddUserBox";

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