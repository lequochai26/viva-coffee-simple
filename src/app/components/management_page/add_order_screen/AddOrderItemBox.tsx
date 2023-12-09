import Button from "@/app/components/Button";
import InputField from "@/app/components/InputField";
import Item from "@/app/interfaces/Item";

// Interfaces:
interface AddOrderItemBoxProps {
    keyword: string;
    itemList: { [index: string]: Item[] };
    onKeywordChange(event: any): void;
    onSearch(): void;
    onReload(): void;
    onAdd(type: string, index: number): void;
}

// Main component:
export default function AddOrderItemBox({ keyword, itemList, onKeywordChange, onSearch, onReload, onAdd }: AddOrderItemBoxProps) {
    // View:
    return (
        <div className="inlineBlock verticalAlignMiddle width40Percent heightFitContent backgroundWhite borderBlackThin borderRadius10px margin25px">
            {/* Search area */}
            <div className="block widthFitParent heightFitContent textAlignJustify padding10px">
                {/* Keyword input field */}
                <InputField type="text" name="keyword" value={keyword} onChange={onKeywordChange} placeholder="Từ khóa tìm kiếm" className="width350px borderBlackThin borderRadius5px margin5px" />

                {/* Search button */}
                <Button type="normal" value="Tìm kiếm" onClick={onSearch} className="margin5px" />

                {/* Reload button */}
                <Button type="normal" value="Tải lại" onClick={onReload} className="margin5px" />
            </div>

            {/* Item list displaying */}
            <div className="block widthFitParent height550px marginBottom10px padding10px textAlignJustify" style={{ overflow: 'scroll' }}>
                
                {
                    (
                        function (): JSX.Element[] {
                            const elements: JSX.Element[] = [];

                            for (const typeName in itemList) {
                                elements.push(
                                    <div key={typeName}>
                                        {/* Title */}
                                        <h1>
                                            { typeName }
                                        </h1>

                                        {/* Item table */}
                                        <table className="widthFitParent fontSize17px">

                                            {/* Header */}
                                            <thead>
                                                <tr>
                                                    <th className="textAlignLeft">
                                                        Mã sản phẩm
                                                    </th>

                                                    <th>
                                                        Tên sản phẩm
                                                    </th>

                                                    <th>
                                                        Đơn giá
                                                    </th>

                                                    <th>

                                                    </th>
                                                </tr>
                                            </thead>

                                            {/* Body */}
                                            <tbody>

                                                {
                                                    itemList[typeName].map(
                                                        function (item: Item, index: number): JSX.Element {
                                                            return (
                                                                <tr key={`${typeName} ${item.id}`}>
                                                                    <td>
                                                                        { item.id }
                                                                    </td>

                                                                    <td>
                                                                        { item.name }
                                                                    </td>

                                                                    <td>
                                                                        { item.price }
                                                                    </td>

                                                                    <td className="textAlignRight">
                                                                        <Button type="normal" value="Thêm" onClick={function() {onAdd(typeName, index)}} />
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

                            return elements;
                        }
                    )()
                }

            </div>
        </div>
    )
}