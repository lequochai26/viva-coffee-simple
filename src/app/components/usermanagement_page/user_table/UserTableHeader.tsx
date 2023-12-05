// Interfaces:
interface UserTableHeaderProps {

}

// Main component:
export default function UserTableHeader() {
    // View:
    return (
        <thead className="fontWeightBold">
            <tr>
                <td className="textAlignLeft">
                    <input type="checkbox" />
                </td>

                <td>
                    <label>
                        Tên người dùng
                    </label>
                </td>

                <td>
                    <label>
                        Họ và tên
                    </label>
                </td>

                <td>
                    <label>
                        Quyền
                    </label>
                </td>

                <td className="textAlignRight">
                    <label className="marginRight5px">
                        Hành động
                    </label>
                </td>
            </tr>
        </thead>
    );
}