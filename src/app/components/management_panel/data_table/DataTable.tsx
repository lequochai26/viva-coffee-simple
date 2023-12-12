import Button from "../../Button";
import DataRow from "../interfaces/DataRow";

// Interfaces:
interface DataTableProps<T extends DataRow> {
    tableConfig: {
        columns: [keyof T, string][];
    };
    editable: boolean;
    viewable: boolean;
    deletable: boolean;
    data: T[];
    selectAll: boolean;
    onSelectAll?(): void;
    onSelect?(index: number): void;
    onEdit?(index: number): void;
    onDelete?(index: number): void;
    onView?(index: number): void;
}

// Main component:
export default function DataTable<T extends DataRow>({ tableConfig, editable, viewable, deletable, data, selectAll, onSelectAll, onSelect, onEdit, onDelete, onView }: DataTableProps<T>) {
    // View:
    return (
        <div className="block widthFitParent" style={{ height: 'calc(100% - 37px)', overflow: 'scroll' }}>
            <table className="widthFitParent heightFitContent fontSize12px">

                {/* Header */}
                <thead className="textAlignLeft">
                    
                    <tr>
                        {/* Select all column */}
                        {
                            deletable && (
                                <th>
                                    <input type="checkbox" checked={selectAll} onChange={onSelectAll} />
                                </th>
                            )
                        }

                        {/* Columns */}
                        {
                            tableConfig.columns.map(
                                function ([ _, title ]: [keyof T, string], index: number) {
                                    return (
                                        <th key={index}>
                                            { title }
                                        </th>
                                    )
                                }
                            )
                        }

                        {/* Operations column */}
                        <th className="textAlignRight">
                            Hành động
                        </th>
                    </tr>

                </thead>

                {/* Body */}
                <tbody>

                    {/* Data */}
                    {
                        data.map(
                            function (record: T, index: number) {
                                return (
                                    <tr key={index}>
                                        {/* Select checkbox */}
                                        {
                                            deletable && (
                                                <td>
                                                    <input type="checkbox" checked={record.selected} onChange={onSelect && function() {onSelect(index)}} />
                                                </td>
                                            )
                                        }

                                        {/* Fields displaying */}
                                        {
                                            tableConfig.columns.map(
                                                function ([field, _]: [ keyof T, string ]) {
                                                    return (
                                                        <td key={`${index}${field.toString()}`}>
                                                            { record[field] as any }
                                                        </td>
                                                    )
                                                }
                                            )
                                        }

                                        {/* Operation buttons */}
                                        <td className="textAlignRight">
                                            {/* Edit button */}
                                            {
                                                editable && (
                                                    <Button type="normal" value="Sửa" onClick={onEdit && function() {onEdit(index)}} className="inlineBlock fontSize12px margin5px" />
                                                )
                                            }

                                            {/* View button */}
                                            {
                                                viewable && (
                                                    <Button type="normal" value="Chi tiết" onClick={onView && function() {onView(index)}} className="inlineBlock fontSize12px margin5px" />
                                                )
                                            }
                                            
                                            {/* Delete button */}
                                            {
                                                deletable && (
                                                    <Button type="normal" value="Xóa" onClick={onDelete && function() {onDelete(index)}} className="inlineBlock fontSize12px margin5px" />
                                                )
                                            }
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }

                </tbody>

            </table>
        </div>
    )
}