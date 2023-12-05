import User from "@/app/interfaces/User";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";

// Interfaces:
interface UserTableProps {
    users: User[];
}

// Main component:
export default function UserTable({ users }: UserTableProps) {
    // View:
    return (
        <table className="widthFitParent heightFitContent">
            {/* Header */}
            <UserTableHeader />

            {/* Body */}
            <tbody>
                {
                    users.map(
                        function (user: User) {
                            return (
                                <UserTableRow key={user.username} user={user} />
                            );
                        }
                    )
                }
            </tbody>
        </table>
    );
}