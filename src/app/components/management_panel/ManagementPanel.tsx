import { useEffect, useState } from "react";
import FixedScreen from "../FixedScreen";
import Header from "./Header";
import DataRow from "./interfaces/DataRow";
import DataTable from "./data_table/DataTable";
import User from "@/app/interfaces/User";
import EntityAlterScreenProps from "./interfaces/EntityAlterScreenProps";
import ConfirmDialogProps from "./interfaces/ConfirmDialogProps";

// Interfaces:
interface ManagementPanelProps<T> {
    config: {
        routeHandler: string;
        table: {
            columns: [keyof T, string][];
        }
        editable: boolean;
        viewable: boolean;
        deletable: boolean;
    };
    AddScreen?(props: EntityAlterScreenProps<T>): JSX.Element;
    EditScreen?(props: EntityAlterScreenProps<T>): JSX.Element;
    ViewScreen?(props: EntityAlterScreenProps<T>): JSX.Element;
    DeleteConfirmDialog(props: ConfirmDialogProps): JSX.Element
    user: User;
}

// Main component:
export default function ManagementPanel<T extends DataRow>({ config, AddScreen, EditScreen, ViewScreen, DeleteConfirmDialog, user }: ManagementPanelProps<T>) {
    // States:
    const [ fixedScreenContent, setFixedScreenContent ] = useState<JSX.Element | undefined>(undefined);
    const [ data, setData ] = useState<T[]>([]);
    const [ searchKeyword, setSearchKeyword ] = useState<string>("");
    const [ selectAll, setSelectAll ] = useState<boolean>(false);

    // Data operations:
    async function load(): Promise<void> {
        try {
            // Try sending HTTP request and attempt to receive response
            const response: Response = await fetch(
                `${config.routeHandler}?sender=${user.username}`,
                {
                    method: "GET",
                    headers: [
                        ["method", "GETALL"]
                    ]
                }
            );

            // Parsing response's body to json
            const body: any = await response.json();

            // Failed case
            if (!body.success) {
                alert(body.message);
            }
            // Success case
            else {
                setData(
                    body.result.map(
                        function (record: any) {
                            return { ...record, selected: false }
                        }
                    )
                );
            }
        }
        catch (error: any) {
            alert("Đã có lỗi xảy ra!");
            console.error(error);
        }
    }

    async function loadByKeyword(): Promise<void> {
         try {
            // Sending HTTP request and receiving response
            const response: Response = await fetch(
                `${config.routeHandler}?sender=${user.username}&keyword=${searchKeyword}`,
                {
                    method: "GET",
                    headers: [
                        ["method", "GETBYKEYWORD"]
                    ]
                }
            );

            // Parsing response body to json
            const body: any = await response.json();

            // Failed case
            if (!body.success) {
                alert(body.message);
            }
            // Success case
            else {
                setData(
                    body.result.map(
                        function (record: any) {
                            return { ...record, selected: false }
                        }
                    )
                );
            }
        }
        catch (error: any) {
            alert("Đã có lỗi xảy ra!");
            console.error(error);
        }
    }

    async function deleteRow(index: number): Promise<void> {
        try {
            // Sending HTTP request and receiving response
            const response: Response = await fetch(
                config.routeHandler,
                {
                    method: "DELETE",
                    body: JSON.stringify(
                        {
                            target: data[index]
                        }
                    )
                }
            );

            // Parsing response's body into json
            const body: any = await response.json();

            // Failed case
            if (!body.success) {
                alert(body.message);
            }
            // Success case
            else {
                // Reload page
                await load();
            }
        }
        catch (error: any) {
            alert("Đã có lỗi xảy ra!");
            console.error(error);
        }
    }

    async function deleteSelected(): Promise<void> {
        try {
            for (const record of data) {
                // Skip if this record is not selected
                if (!record.selected) {
                    continue;
                }

                // Sending HTTP request and receiving response
                const response: Response = await fetch(
                    config.routeHandler,
                    {
                        method: "DELETE",
                        body: JSON.stringify(
                            {
                                target: record
                            }
                        )
                    }
                )

                // Parse response's body into json
                const body: any = await response.json();

                // Failed case
                if (!body.success) {
                    alert(body.message);
                }
            }
        }
        catch (error: any) {
            alert("Đã có lỗi xảy ra!");
            console.error(error);
        }

        load().catch(
            function (error: any) {
                alert("Đã có lỗi xảy ra!");
                console.error(error);
            }
        );
    }

    // UI Operations:
    function closeFixedScreen(): void {
        setFixedScreenContent(undefined);
    }

    function showAddScreen(): void {
        if (!AddScreen) {
            return;
        }

        setFixedScreenContent(
            <AddScreen user={user} onAlter={load} close={closeFixedScreen} />
        );
    }

    function showEditScreen(index: number): void {
        if (!EditScreen) {
            return;
        }

        setFixedScreenContent(
            <EditScreen user={user} target={data[index]} onAlter={load} close={closeFixedScreen} />
        );
    }

    function showViewScreen(index: number): void {
        if (!ViewScreen) {
            return;
        }

        setFixedScreenContent(
            <ViewScreen user={user} target={data[index]} onAlter={load} close={closeFixedScreen} />
        );
    }

    function showDeleteConfirmDialog(index: number): void {
        setFixedScreenContent(
            <DeleteConfirmDialog
                onCancel={closeFixedScreen}
                onConfirm={function () {deleteRow(index)}}
            />
        )
    }

    function showDeleteSelectedConfirmDialog(): void {
        setFixedScreenContent(
            <DeleteConfirmDialog
                onCancel={closeFixedScreen}
                onConfirm={deleteSelected}
            />
        )
    }

    // Event handlers:
    function onSearchKeywordChange({ target }: any): void {
        setSearchKeyword(target.value);
    }

    function onSelectAll(): void {
        setData(
            data.map(
                function (record: T) {
                    return { ...record, selected: !selectAll }
                }
            )
        );

        setSelectAll(!selectAll);
    }

    function onRowSelect(index: number): void {
        setData(
            data.map(
                function (record: T, _index: number) {
                    if (_index !== index) {
                        return { ...record };
                    }
                    else {
                        return { ...record, selected: !record.selected };
                    }
                }
            )
        );
    }

    // Effects:
    useEffect(
        function () {
            load();
        }, []
    )

    // View:
    return (
        <>
            {/* Fixed screen */}
            <FixedScreen content={fixedScreenContent} />

            {/* Management panel */}
            <div className="block widthFitParent heightFitParent">
                {/* Header */}
                <Header
                    deletable={config.deletable}
                    keyword={searchKeyword}
                    onAdd={showAddScreen}
                    onDelete={showDeleteSelectedConfirmDialog}
                    onReload={load}
                    onKeywordChange={onSearchKeywordChange}
                    onSearch={loadByKeyword}
                />

                {/* Table */}
                <DataTable
                    data={data}
                    selectAll={selectAll}
                    tableConfig={config.table}
                    editable={config.editable}
                    viewable={config.viewable}
                    deletable={config.deletable}
                    onSelectAll={onSelectAll}
                    onSelect={onRowSelect}
                    onDelete={showDeleteConfirmDialog}
                    onEdit={showEditScreen}
                    onView={showViewScreen}
                />
            </div>
        </>
    );
}