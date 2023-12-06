import { itemTypeManager } from "@/domain/EntityManagerCollection";
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