import { Order, OrderItem } from "@/app/interfaces/Order";
import InputField from "../../InputField";
import Image from "next/image";

// Interfaces:
export interface AddOrderBoxProps {
    fields: Order;
    onRemove(index: number): void;
    onAmountChange(event: any, index: number): void;
    onAdd(): void;
    onCancel(): void;
}

// Main component:
export default function AddOrderBox({ fields, onRemove, onAmountChange, onAdd, onCancel }: AddOrderBoxProps) {
    // View:
    return (
        <div className="inlineBlock verticalAlignMiddle width40Percent heightFitContent backgroundWhite borderBlackThin borderRadius5px">
            
            {/* Title */}
            <div className="widthFitParent heightFitContent textAlignJustify padding10px marginBottom10px">
                <label className="widthFitContent heightFitContent fontSize25px fontWeightBold">
                    Chi tiết hóa đơn:
                </label>
            </div>

            {/* Order detail table */}
            <div className="widthFitParent height350px textAlignCenter" style={{ overflow: 'scroll' }}>
                
                <div className="inlineBlock width95Percent heightFitContent borderBlackThin">
                    <table className="widthFitParent heightFitContent fontSize20px">

                        {/* Header */}
                        <thead>
                            <tr>
                                <th className="textAlignLeft">
                                    Số thứ tự
                                </th>

                                <th>
                                    Tên sản phẩm
                                </th>

                                <th>
                                    Số lượng
                                </th>

                                <th>
                                    Thành tiền
                                </th>

                                <th>
                                    
                                </th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>

                            {/* Items displaying */}
                            {
                                fields.items.map(
                                    function (item: OrderItem, index: number) {
                                        return (
                                            <tr key={index}>
                                                {/* Index */}
                                                <td className="textAlignLeft">
                                                    { index + 1 }
                                                </td>

                                                {/* Item name */}
                                                <td>
                                                    { item.itemName }
                                                </td>

                                                {/* Amount */}
                                                <td>
                                                    <InputField type="number" name="" value={item.amount} onChange={function (event: any) {onAmountChange(event, index)}} className="textAlignCenter width75px" />
                                                </td>

                                                {/* Total price */}
                                                <td>
                                                    { item.totalPrice }
                                                </td>

                                                {/* Actions */}
                                                <td>
                                                    <Image src="/trash.png" width={20} height={20} alt="Trash icon" className="cursorPointer" onClick={function () {onRemove(index)}} />
                                                </td>
                                            </tr>
                                        )
                                    }
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

            

        </div>
    )
}