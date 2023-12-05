import Image from "next/image";

// Interfaces:
interface ContentAreaHeaderProps {
    menuBarShow: boolean;
    onMenuButtonClick?(): void;
}

// Main component:
export default function ContentAreaHeader({ menuBarShow, onMenuButtonClick }: ContentAreaHeaderProps) {
    return (
        <div className={`block borderBlackThin ${menuBarShow ? "borderLeftNone": ""} widthFitParent height50px paddingTop5px paddingBottom5px`}>
            {/* Ruler */}
            <div className="ruler"></div>

            {/* Menubar button */}
            <Image src="/list.png" width={35} height={35} alt="List icon" className="inlineBlock marginLeft12px cursorPointer verticalAlignMiddle" onClick={onMenuButtonClick} />
        </div>
    )
}