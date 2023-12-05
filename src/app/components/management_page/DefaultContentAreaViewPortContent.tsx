export default function DefaultContentAreaViewPortContent() {
    return (
        <div className="widthFitParent heightFitParent textAlignCenter">
            {/* Ruler */}
            <div className="ruler"></div>

            {/* Content */}
            <div className="inlineBlock widthFitParent heightFitContent verticalAlignMiddle">
                <h1 className="fontWeightNormal">
                    Xin chào!
                </h1>

                <p>
                    Vui lòng chọn vào một trong các menu bên trái để truy cập đến giao diện quản lý mong muốn.
                </p>

                <p>
                    Chúc bạn có ngày làm việc vui vẻ và tràn đầy năng lượng
                </p>
            </div>
        </div>
    )
}