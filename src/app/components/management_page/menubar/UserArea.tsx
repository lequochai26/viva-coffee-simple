import User from "@/app/interfaces/User";
import Image from "next/image";
import { useState } from "react";
import Button from "../../Button";

// Interfaces:
interface UserAreaProps {
    user: User;
    onLogout?(): void;
    onChangePassword?(): void;
}

// Main component:
export default function UserArea({ user, onLogout, onChangePassword }: UserAreaProps) {
    // States:
    const [ hovering, setHovering ] = useState<boolean>(false);

    // Event handlers:
    function onMouseEnter() {
        setHovering(true);
    }

    function onMouseLeave() {
        setHovering(false);
    }

    // View:
    return (
        <div className="block widthFitParent heightFitContent textAlignCenter marginBottom25px" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            
            <table className="block widthFitParent heightFitContent">

                <tbody>

                    <tr>
                        {/* Account icon */}
                        <td className="padding5px">
                            <Image src="/account.png" width={40} height={40} alt="Account icon" className="verticalAlignMiddle" />
                        </td>

                        {/* User's fullname */}
                        <td>
                            <label className="fontWeightBold">
                                { user.fullName } [{ user.permission }]
                            </label>
                        </td>
                    </tr>

                </tbody>
                
            </table>


            {
                (
                    hovering && (
                        <div>
                            <p>
                                <Button type="normal" value="Thay đổi mật khẩu" className="fontSize12px" onClick={onChangePassword} />
                            </p>
                            <p>
                                <Button type="normal" value="Đăng xuất" className="fontSize12px" onClick={onLogout} />
                            </p>
                        </div>
                    )
                )
            }
        </div>
    )
}