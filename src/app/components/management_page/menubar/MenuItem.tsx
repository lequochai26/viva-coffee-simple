import Image from "next/image";

// Interfaces:
interface MenuItemProps {
    iconSrc: string;
    title: string;
    onClick?(): void;
    className?: string;
}

// Main component:
export default function MenuItem({ iconSrc, title, onClick, className }: MenuItemProps) {
    // View:
    return (
        <div className={`borderBlackThin widthFitParent heightFitContent cursorPointer paddingTop5px paddingBottom5px borderLeftNone borderRightNone ${className}`} onClick={onClick}>
            
            <table className="block widthFitParent heightFitContent">

                <tbody>

                    <tr>
                        {/* Icon */}
                        <td>
                            <Image src={iconSrc} width={30} height={30} alt="User icon" className="inlineBlock verticalAlignMiddle margin2px cursorInherit" />
                        </td>

                        {/* Title */}
                        <td>
                            <label className="textAlignCenter fontWeightBold cursorInherit">
                                { title }
                            </label>
                        </td>
                    </tr>

                </tbody>

            </table>

        </div>
    )
}