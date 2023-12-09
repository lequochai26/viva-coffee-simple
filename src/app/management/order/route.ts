import { NextRequest, NextResponse } from "next/server";
import { Order, OrderItem } from "@/app/interfaces/Order";
import { itemManager, orderItemManager, orderManager, userManager } from "@/domain/EntityManagerCollection";
import { OrderEntity, OrderItemEntity } from "./aliases/entityAliases";
import orderJsonToOrderEntity from "./scripts/orderJsonToOrderEntity";
import orderIdGenerate from "./scripts/orderIdGenerate";

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

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // Parsing request's body into json
        const body: any = await request.json();

        // Get target field of body
        const target: Order | undefined = body.target;

        // Target not found case
        if (!target) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy đối tượng cần thêm!" }
            );
        }

        // Get current date
        const date: Date = new Date();

        // Generate id string
        const id: string | undefined = await orderIdGenerate(date, orderManager);

        // Failed to generate id case
        if (!id) {
            return NextResponse.json(
                { success: false, message: "Đã đạt đến tối đa số lượng đơn cho ngày hôm nay!" }
            );
        }

        // Convert target into order entity
        const order: OrderEntity = await orderJsonToOrderEntity(target, id, date, userManager, itemManager);

        // Saving order's items dependency into db
        for (const orderItem of order.Items) {
            await orderItemManager.insert(orderItem);
        }

        // Saving order entity into db
        await orderManager.insert(order);

        // Success responding
        return NextResponse.json(
            { success: true, id: id, date: date }
        );
    }
    catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.toString() }
        );
    }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {
        // Parsing request's body into json
        const { target }: { target: Order | undefined } = await request.json();

        // Target not found case
        if (!target) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy đối tượng cần xóa!" }
            );
        }

        // Get Order entity base on target
        const order: OrderEntity | undefined = await orderManager.get(target.id, []);

        // Order entity not found in db case
        if (!order) {
            return NextResponse.json(
                { success: false, message: `Không tồn tại đơn hàng với mã "${target.id}" trong cơ sở dữ liệu hệ thống!` }
            );
        }

        // Removing order's items dependency
        for (const item of order.Items) {
            orderItemManager.remove(item);
        }

        // Removing order
        orderManager.remove(order);

        // Success responding
        return NextResponse.json(
            { success: true }
        );
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
                    itemPrice: item.Item?.Price as number,
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