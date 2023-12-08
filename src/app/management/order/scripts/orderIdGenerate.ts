import IOrderManager from "@/domain/interfaces/IOrderManager";

export default async function orderIdGenerate(date: Date, orderManager: IOrderManager): Promise<string | undefined> {
    const path: any[] = [];

    for (let i = 0;i<10000;i++) {
        const day: string = toString(date.getDate(), 2);
        const month: string = toString(date.getMonth(), 2);
        const year: string = toString(date.getFullYear(), 4);
        const id: string = `${day}${month}${year}${toString(i, 4)}`;

        if (!await orderManager.get(id, path)) {
            return id;
        }
    }
}

function toString(target: number, zeroNum: number): string {
    let result: string = `${target}`;

    while (result.length < zeroNum) {
        result = `0${result}`;
    }

    return result;
}