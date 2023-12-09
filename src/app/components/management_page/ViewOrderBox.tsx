import { Order, OrderItem } from "@/app/interfaces/Order";
import EntityAlterScreenProps from "../management_panel/interfaces/EntityAlterScreenProps";
import Button from "../Button";

// Main component:
export function ViewOrderBox({ target, close }: EntityAlterScreenProps<Order>) {
    // View:
    return (
        <div className="inlineBlock verticalAlignMiddle width500px height500px backgroundWhite borderBlackThin">
            
            {/* View order div */}
            <div className="block widthFitParent height400px marginBottom25px" style={{ overflow: 'scroll' }}>
                {/* Table */}
                <table className="widthFitParent heightFitContent fontSize20px textAlignJustify" border={1} cellSpacing={0} cellPadding={5}>

                    {/* Body */}
                    <tbody>
                        <tr>
                            <th>
                                Mã đơn hàng:
                            </th>

                            <td>
                                { target?.id }
                            </td>
                        </tr>

                        <tr>
                            <th>
                                Ngày lập đơn:
                            </th>

                            <td>
                                { target?.date.toString() }
                            </td>
                        </tr>

                        <tr>
                            <th>
                                Lập bởi:
                            </th>

                            <td>
                                { target?.createdByFullName }
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2}>
                                {/* Title */}
                                <label className="fontWeightBold">
                                    Chi tiết hóa đơn:
                                </label>

                                {/* Order items table */}
                                <table className="widthFitParent heightFitContent fontSize15px">
                                    {/* Header */}
                                    <thead>
                                        <tr>
                                            <th>
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
                                        </tr>
                                    </thead>

                                    {/* Body */}
                                    {
                                        target?.items.map(
                                            function (orderItem: OrderItem, index: number) {
                                                return (
                                                    <tr key={`${target.id} ${orderItem.item}`}>
                                                        <td>
                                                            { index + 1 }
                                                        </td>

                                                        <td>
                                                            { orderItem.itemName }
                                                        </td>

                                                        <td>
                                                            { orderItem.amount }
                                                        </td>

                                                        <td>
                                                            { orderItem.totalPrice }
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                Tổng thành tiền:
                            </th>

                            <td>
                                { target?.totalPrice.toString() }
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

            {/* Action area */}
            <div className="block widthFitParent heightFitContent textAlignCenter">                
                <Button type="normal" value="OK" onClick={close} />
            </div>

        </div>
    )
}