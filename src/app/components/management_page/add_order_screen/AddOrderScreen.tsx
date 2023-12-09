import { Order, OrderItem } from "@/app/interfaces/Order";
import EntityAlterScreenProps from "../../management_panel/interfaces/EntityAlterScreenProps";
import { useEffect, useState } from "react";
import User from "@/app/interfaces/User";
import Item from "@/app/interfaces/Item";
import AddOrderBox from "./AddOrderBox";
import AddOrderItemBox from "./AddOrderItemBox";

// Info:
const routeHandler: string = "/management/order";
const itemManagementRouteHandler: string = "/management/item";

// Main component:
export default function AddOrderScreen({ user, onAlter, close }: EntityAlterScreenProps<Order>) {
    // States:
    const [ fields, setFields ] = useState<Order>(
        {
            id: "",
            createdBy: (user as User).username,
            createdByFullName: (user as User).fullName,
            date: new Date(),
            items: [],
            totalPrice: 0
        }
    );
    const [ itemList, setItemList ] = useState<{ [index: string]: Item[] }>({});
    const [ keyword, setKeyword ] = useState<string>("");

    // Data operations:
    async function load(keyword?: string): Promise<void> {
        try {
            // Sending HTTP request and receiving response
            const response: Response = await fetch(
                (keyword ? `${itemManagementRouteHandler}?keyword=${keyword}` : itemManagementRouteHandler),
                {
                    method: "GET",
                    headers: [
                        ["method", (keyword ? "GETBYKEYWORD" : "GETALL")]
                    ]
                }
            );

            // Parsing response's body into json
            const { success, result, message }: { success: boolean, result: Item[], message: string } = await response.json();

            // Failed case
            if (!success) {
                alert(message);
            }
            // Success case
            else {
                setItemList(
                    itemsToItemList(result)
                );
            }
        }
        catch (error: any) {
            alert("Đã có lỗi xảy ra!");
            console.error(error);
        }
    }

    async function addNewOrder(): Promise<void> {
        // Precheck
        if (fields.items.length < 1) {
            alert("Đơn hàng không hợp lệ, vui lòng thử lại!");
            return;
        }

        for (const item of fields.items) {
            if (item.amount < 1) {
                alert("Đơn hàng không hợp lệ, vui lòng thử lại!");
                return;
            }
        }
        
        // Adding new order processing
        try {
            // Sending HTTP request and receiving response
            const response: Response = await fetch(
                routeHandler,
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            target: fields
                        }
                    )
                }
            );

            // Parsing response's body into json
            const { success, message }: { success: boolean, message: string } = await response.json();

            // Failed case
            if (!success) {
                alert(message);
            }
            // Success case
            else {
                // Fire onAlter
                onAlter();

                // Close
                close();
            }
        }
        catch (error: any) {
            alert("Đã có lỗi xảy ra!");
            console.error(error);
        }
    }

    // Effects:
    useEffect(
        function () {
            load();
        }, []
    )

    // Event handler:
    function changeOrderItemAmount(event: any, index: number): void {
        if (Number.isNaN(event.target.valueAsNumber)) {
            return;
        }
        if (event.target.valueAsNumber < 1) {
            return;
        }
        const newFields: Order = cloneFields(fields);
        newFields.items[index].amount = event.target.valueAsNumber;
        setFields(newFields);
    }

    function removeOrderItem(index: number): void {
        const newFields: Order = cloneFields(fields);
        newFields.items = newFields.items.filter(
            function (item: OrderItem, _index: number) {
                if (_index !== index) {
                    return item;
                }
            }
        )
        setFields(newFields);
    }

    function addOrderItem(type: string, index: number): void {
        const newFields: Order = cloneFields(fields);

        for (const item of newFields.items) {
            if (item.item === itemList[type][index].id) {
                item.amount += 1;
                setFields(newFields);
                return;
            }
        }

        newFields.items.push(
            {
                item: itemList[type][index].id,
                itemName: itemList[type][index].name,
                itemPrice: itemList[type][index].price,
                amount: 1,
                totalPrice: 0
            }
        );
        setFields(newFields);
    }

    function changeKeyword(event: any) {
        setKeyword(event.target.value);
    }

    // View:
    return (
        <div className="inlineBlock verticalAlignMiddle widthFitParent heightFitContent">
            {/* Add order box */}
            <AddOrderBox
                fields={fields}
                onAdd={addNewOrder}
                onAmountChange={changeOrderItemAmount}
                onCancel={close}
                onRemove={removeOrderItem}
            />

            {/* Add order item box */}
            <AddOrderItemBox
                itemList={itemList}
                keyword={keyword}
                onAdd={addOrderItem}
                onKeywordChange={changeKeyword}
                onReload={function () {load()}}
                onSearch={function () {load(keyword)}}
            />
        </div>
    )
}

// Local functions:
function itemsToItemList(items: Item[]): { [index: string]: Item[] } {
    // Item list initialization
    const itemList: { [index: string]: Item[] } = {};

    // Conversion
    items.forEach(
        function (item: Item): void {
            const typeName: string = (item.typeName ? item.typeName : "Không xác định");
            if (!itemList[typeName]) {
                itemList[typeName] = [];
            }
            itemList[typeName].push(item);
        }
    )

    // Return item list
    return itemList
}

function cloneFields(fields: Order): Order {
    const newFields: Order = { ...fields };

    newFields.items = newFields.items.map(
        function (item: OrderItem) {
            return { ...item };
        }
    );

    return newFields;
}