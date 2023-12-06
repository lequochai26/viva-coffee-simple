import { useEffect, useState } from "react";
import FixedScreen from "../FixedScreen";
import Header from "./Header";
import DataRow from "./interfaces/DataRow";
import DataTable from "./data_table/DataTable";

// Interfaces:
interface ManagementPanelProps<T> {
    config: {
        routeHandler: string;
        table: {
            columns: [keyof T, string][];
        }
    };
    AddScreen: any;
    EditScreen: any;
}

// Main component:
export default function ManagementPanel<T extends DataRow>({ config, AddScreen, EditScreen }: ManagementPanelProps<T>) {
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
                config.routeHandler,
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
                `${config.routeHandler}?keyword=${searchKeyword}`,
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
        setFixedScreenContent(
            <AddScreen onAlter={load} close={closeFixedScreen} />
        );
    }

    function showEditScreen(index: number): void {
        setFixedScreenContent(
            <EditScreen target={data[index]} onAlter={load} close={closeFixedScreen} />
        );
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
                <Header keyword={searchKeyword} onAdd={showAddScreen} onDelete={deleteSelected} onReload={load} onKeywordChange={onSearchKeywordChange} onSearch={loadByKeyword} />

                {/* Table */}
                <DataTable data={data} selectAll={selectAll} tableConfig={config.table} onSelectAll={onSelectAll} onSelect={onRowSelect} onDelete={deleteRow} onEdit={showEditScreen} />
            </div>
        </>
    );
}