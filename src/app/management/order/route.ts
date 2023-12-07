import { orderManager } from "@/domain/EntityManagerCollection";
import Order from "@/domain/entities/Order";
import OrderItem from "@/domain/entities/OrderItem";
import { NextRequest, NextResponse } from "next/server";

// Methods:
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Get get method from request's header
        const getMethod: string | null = request.headers.get("method");

        // Get method not found case
        if (!getMethod) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy phương thức truy vấn!" }
            );
        }

        // Get data base on get method
        switch (getMethod) {
            case "GETALL": return NextResponse.json(
                {
                    success: true,
                    result: (await orderManager.getAll([])).map(
                        function (order: Order) {
                            return convertOrderEntity(order)
                        }
                    )
                }
            );

            case "GETBYKEYWORD": {
                // Get keyword
                const keyword: string | null = request.nextUrl.searchParams.get("keyword");

                // Keyword not found case
                if (!keyword) {
                    return NextResponse.json(
                        { success: false, message: "Không tìm thấy từ khóa tìm kiếm!" }
                    );
                }

                // Responding
                return NextResponse.json(
                    {
                        success: true,
                        result: (await orderManager.getAll([])).map(
                            function (order: Order) {
                                return convertOrderEntity(order);
                            }
                        ).filter(
                            function (order: any) {
                                let items: string = "";

                                order.items.forEach(
                                    function (item: any, index: number) {
                                        if (index !== 0) {
                                            items += " "
                                        }
                                        items += `${item.itemId} ${item.itemName} ${item.amount} ${item.totalPrice}`
                                    }
                                );

                                if (`${order.id} ${order.date} ${order.createdBy.username} ${order.createdBy.fullName} ${order.totalPrice} ${ items }`.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
                                    return order;
                                }
                            }
                        )
                    }
                );
            }

            default: return NextResponse.json(
                { success: false, message: "Phương thức truy vấn không hợp lệ!" }
            );
        }
    }
    catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.toString() }
        )
    }
}

function convertOrderEntity(order: Order): any {
    const items: any[] = [];

    order.Items.forEach(
        function (orderItem: OrderItem) {
            items.push(
                {
                    itemId: orderItem.Item?.Id,
                    itemName: orderItem.Item?.Name,
                    amount: orderItem.Amount,
                    totalPrice: orderItem.TotalPrice
                }
            );
        }
    );

    return {
        id: order.Id,
        date: order.Date,
        createdBy: order.CreatedBy?.Username,
        createdByFullName: order.CreatedBy?.FullName,
        totalPrice: order.TotalPrice,
        items: items
    }
}