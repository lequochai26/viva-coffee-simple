import ContentAreaHeader from "./ContentAreaHeader";
import ContentAreaViewPort from "./ContentAreaViewPort";

// Interfaces:
interface ContentAreaProps {
    menuBarShow: boolean;
    onMenuButtonClick?(): void;
    viewPortContent: JSX.Element;
}

// Main component:
export default function ContentArea({ menuBarShow, viewPortContent, onMenuButtonClick }: ContentAreaProps) {
    // View:
    return (
        <div className="inlineBlock heightFitParent verticalAlignTop" style={{ width: (menuBarShow ? 'calc(100% - 200px)' : "100%") }}>
            {/* Header */}
            <ContentAreaHeader menuBarShow={menuBarShow} onMenuButtonClick={onMenuButtonClick} />

            {/* Viewport */}
            <ContentAreaViewPort
                content={viewPortContent}
            />
        </div>
    );
}