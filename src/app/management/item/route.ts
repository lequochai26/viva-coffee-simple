import { itemManager, itemTypeManager } from "@/domain/EntityManagerCollection";
import Item from "@/domain/entities/Item";
import ItemType from "@/domain/entities/ItemType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Get get method from request's header
        const getMethod: string | null = request.headers.get("method");

        // Get method not found case
        if (!getMethod) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy phương thức truy vấn được yêu cầu!" }
            );
        }

        // Response base on get method
        switch(getMethod) {
            case 'GETALL': return NextResponse.json(
                {
                    success: true,
                    result: (await itemManager.getAll([])).map(
                        function (item: Item) {
                            return {
                                id: item.Id,
                                name: item.Name,
                                price: item.Price,
                                typeName: item.Type?.Name,
                                typeId: item.Type?.Id
                            }
                        }
                    )
                }
            )

            case 'GETBYKEYWORD': {
                // Get keyword
                const keyword: string | null = request.nextUrl.searchParams.get("keyword");

                // Keyword not found case
                if (!keyword) {
                    return NextResponse.json(
                        { success: false, message: "Không tìm thấy từ khóa tìm kiếm!" }
                    );
                }

                // Get by keyword and response
                return NextResponse.json(
                    {
                        success: true,
                        result: (await (itemManager.getAll([]))).map(
                            function (item: Item) {
                                return {
                                    id: item.Id,
                                    name: item.Name,
                                    price: item.Price,
                                    typeName: item.Type?.Name,
                                    typeId: item.Type?.Id
                                };
                            }
                        ).filter(
                            function (item) {
                                if (`${item.id} ${item.name} ${item.price} ${item.typeId} ${item.typeName}`.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
                                    return item;
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

export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {
        // Parse request's body into json
        const body: any = await request.json();

        // Get target from body
        const target: any = body.target;

        // Target not found case
        if (!target) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy đối tượng cần xóa" }
            );
        }

        // Get item entity based on target's id field
        const item: Item | undefined = await itemManager.get(target.id, []);

        // Target not found in db
        if (!item) {
            return NextResponse.json(
                { success: false, message: `Không tìm thấy sản phẩm với mã "${target.id}" trong cơ sở dữ liệu hệ thống!` }
            );
        }

        // Removing item from db
        await itemManager.remove(item);

        // Success responsding
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

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // Parsing request's body into json
        const body: any = await request.json();

        // Get target field of body
        const target: any = body.target;

        // Target not found case
        if (!target) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy đối tượng cần thêm!" }
            );
        }

        // Destruct target
        const { id, name, price, typeId }: any = target;

        // Item already exist case
        if (await itemManager.get(id, [])) {
            return NextResponse.json(
                { success: false, message: `Sản phẩm với mã "${id}" đã tồn tại trong cơ sở dữ liệu hệ thống!` }
            );
        }

        // Get item type entity with given typeId
        const itemType: ItemType | undefined = await itemTypeManager.get(typeId, []);

        // Item type not exist case
        if (!itemType) {
            return NextResponse.json(
                { success: false, message: `Không tìm thấy loại sản phẩm với mã "${typeId}" trong cơ sở dữ liệu hệ thống!` }
            );
        }

        // Create new item entity
        const item: Item = new Item();
        item.Id = id;
        item.Name = name;
        item.Price = price;
        item.Type = itemType;

        // Try inserting item entity into db
        await itemManager.insert(item);

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

export async function PUT(request: NextRequest): Promise<NextResponse> {
    try {
        // Parsing request's body into json
        const body: any = await request.json();

        // Get target from body
        const target: any = body.target;

        // Target not found case
        if (!target) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy đối tượng cần chỉnh sửa!" }
            );
        }

        // Get item entity base on target's id field
        const item: Item | undefined = await itemManager.get(target.id, []);

        // Item entity not exist case
        if (!item) {
            return NextResponse.json(
                { success: false, message: `Không tồn tại sản phẩm với mã "${target.id}" trong cơ sở dữ liệu hệ thống!` }
            );
        }

        // Updating item's fields
        item.Name = target.name;
        item.Price = target.price;

        // Item type relationship changed
        if (item.Type?.Id !== target.typeId) {
            // Get item type with target's typeId field
            const itemType: ItemType | undefined = await itemTypeManager.get(target.typeId, []);

            // Item type not exist
            if (!itemType) {
                return NextResponse.json(
                    { success: false, message: `Không tồn tại loại sản phẩm với mã "${target.typeId}" trong cơ sở dữ liệu hệ thống!` }
                );
            }

            // Updating type field for item
            item.Type = itemType;
        }

        // Updating item into db
        itemManager.update(item);

        // Success responding
        return NextResponse.json({ success: true });
    }
    catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.toString() }
        );
    }
}