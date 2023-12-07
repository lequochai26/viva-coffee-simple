import { NextRequest, NextResponse } from "next/server";
import { Order, OrderItem } from "@/app/interfaces/Order";
import { orderManager } from "@/domain/EntityManagerCollection";
import { OrderEntity, OrderItemEntity } from "./aliases";

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

        // Getting data base on given get method
        switch (getMethod) {
            case 'GETALL': return NextResponse.json(
                {
                    success: true,
                    result: (await orderManager.getAll([])).map(
                        function (order: OrderEntity): Order {
                            return convertOrderEntity(order);
                        }
                    )
                }
            )

            case 'GETALL': {
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
                            function (order: OrderEntity): Order {
                                return convertOrderEntity(order);
                            }
                        ).filter(
                            function (order: Order) {
                                if (`${order.id} ${order.createdBy} ${order.createdByFullName} ${order.date} ${order.totalPrice}`.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
                                    return order;
                                }
                            }
                        )
                    }
                )
            }

            default: return NextResponse.json(
                { success: false, message: "Phương thức truy vấn không hợp lệ!" }
            );
        }
    }
    catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.toString() }
        );
    }
}

// Local functions
function convertOrderEntity(order: OrderEntity): Order {
    const items: OrderItem[] = [];

    order.Items.forEach(
        function (item: OrderItemEntity) {
            items.push(
                {
                    item: item.Item?.Id as string,
                    itemName: item.Item?.Name as string,
                    amount: item.Amount as number,
                    totalPrice: item.TotalPrice as number
                }
            );
        }
    )

    return {
        id: order.Id as string,
        date: order.Date as Date,
        totalPrice: order.TotalPrice as number,
        createdBy: order.CreatedBy?.Username as string,
        createdByFullName: order.CreatedBy?.FullName as string,
        items: items
    };
}