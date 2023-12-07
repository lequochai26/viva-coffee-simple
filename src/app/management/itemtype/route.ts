import { itemManager, itemTypeManager } from "@/domain/EntityManagerCollection";
import ItemType from "@/domain/entities/ItemType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Get get method from request
        const getMethod: string | null = request.headers.get("method");

        // Get method not found case
        if (!getMethod) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy phương thức truy vấn được yêu cầu! "}
            );
        }

        // Getting base on get method
        switch (getMethod) {
            case 'GETALL': return NextResponse.json(
                {
                    success: true,
                    result: (await itemTypeManager.getAll([])).map(
                        function (itemType: ItemType) {
                            return {
                                id: itemType.Id,
                                name: itemType.Name
                            };
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

                // Get base on keyword and return
                return NextResponse.json(
                    {
                        success: true,
                        result: (await itemTypeManager.getAll([])).map(
                            function (itemType: ItemType) {
                                return {
                                    id: itemType.Id,
                                    name: itemType.Name
                                }
                            }
                        ).filter(
                            function (itemType) {
                                if (`${itemType.id} ${itemType.name}`.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
                                    return itemType;
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
        );
    }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {
        // Parsing request's body into json
        const { target }: any = await request.json();

        // Target not found case
        if (!target) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy đối tượng cần xóa!" }
            );
        }

        // Destruct target
        const { id }: any = target;

        // Get item type entity with give id
        const itemType: ItemType | undefined = await itemTypeManager.get(id, []);

        // Target item type entity not found in db case
        if (!itemType) {
            return NextResponse.json(
                { success: false, message: `Không tìm thấy loại sản phẩm với mã "${id}" trong cơ sở dữ liệu hệ thống!` }
            );
        }

        // Unlink all Items linked with this item type entity
        for (const item of itemType.Items) {
            item.Type = undefined;
            await itemManager.update(item);
        }

        // Removing item type entity
        await itemTypeManager.remove(itemType);

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

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // Parsing request's body into json
        const body: any = await request.json();

        // Get body's target field
        const target: any = body.target;

        // Target not found case
        if (!target) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy đối tượng cần thêm!" }
            );
        }

        // Destruct target
        const { id, name }: any = target;

        // Item type entity with given id already exist case
        if (await itemTypeManager.get(id, [])) {
            return NextResponse.json(
                { success: false, message: `Đã tồn tại một loại sản phẩm với mã "${id}" trong cơ sở dữ liệu hệ thống!` }
            );
        }

        // Create new item type entity
        const itemType: ItemType = new ItemType();
        itemType.Id = id;
        itemType.Name = name;

        // Add this item type entity into db
        await itemTypeManager.insert(itemType);

        // Success responding
        return NextResponse.json(
            { success: true }
        );
    }
    catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.toString() }
        )
    }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
    try {
        // Parsing request's body into json
        const body: any = await request.json();

        // Get target field of body
        const target: any = body.target;

        // Target not found case
        if (!target) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy đối tượng cần chỉnh sửa!" }
            );
        }

        // Destruct target
        const { id, name }: any = target;

        // Get item type entity with given id
        const itemType: ItemType | undefined = await itemTypeManager.get(id, []);

        // Item type entity not found in db
        if (!itemType) {
            return NextResponse.json(
                { success: false, message: `Không tồn tại loại sản phẩm với mã "${id}" trong cơ sở dữ liệu hệ thống!` }
            );
        }

        // Updating itemType's fields
        itemType.Name = name;

        // Update item type entity
        itemTypeManager.update(itemType);

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