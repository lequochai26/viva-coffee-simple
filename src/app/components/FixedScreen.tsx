interface FixedScreenProps {
    content?: JSX.Element;
}

function FixedScreen({ content }: FixedScreenProps) {
    // View:
    return (
        content
        &&
        <div className="block backgroundTransparencyBlack positionFixed left0px top0px widthFitScreen heightFitScreen textAlignCenter">
            {/* Ruler */}
            <div className="ruler"></div>

            {/* Content */}
            { content }
        </div>
    );
}

export default FixedScreen;