import User from "@/app/interfaces/User";
import LocalButton from "../LocalButton";

// Interfaces:
interface UserTableRowProps {
    user: User
}

// Main component:
export default function UserTableRow({ user }: UserTableRowProps) {
    return (
        <tr>
            <td className="textAlignLeft">
                <input type="checkbox" />
            </td>

            <td>
                <label>
                    { user.username }
                </label>
            </td>

            <td>
                <label>
                    { user.fullName }
                </label>
            </td>

            <td>
                <label>
                    { user.permission }
                </label>
            </td>

            <td className="textAlignRight">
                <LocalButton type="normal" value="Sửa" className="marginRight5px" />
                <LocalButton type="normal" value="Xóa" className="marginRight5px" />
            </td>
        </tr>
    );
}