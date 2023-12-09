import Button from "../Button";
import ConfirmDialogProps from "../management_panel/interfaces/ConfirmDialogProps";

// Main component:
export default function DeleteConfirmDialog({ onCancel, onConfirm }: ConfirmDialogProps) {
    // View:
    return (
        <div className="inlineBlock verticalAlignMiddle width350px heightFitContent backgroundWhite borderBlackThin borderRadius10px padding10px paddingLeft25px paddingRight25px">
            {/* Title */}
            <div>
                <h1>
                    Cảnh báo
                </h1>
            </div>

            {/* Content */}
            <div className="textAlignJustify">
                <p>
                    Việc xóa dữ liệu có thể ảnh hưởng đến các dữ liệu khác có liên quan.
                </p>
                <p>
                    Bạn có chắc chắn muốn xóa không ?
                </p>
            </div>

            {/* Confirmation area */}
            <div>
                {/* Cancel button */}
                <Button type="normal" value="Hủy" onClick={onCancel} className="margin5px" />

                {/* Confirm button */}
                <Button type="normal" value="Xóa" onClick={onConfirm} className="margin5px backgroundRed" />
            </div>
        </div>
    )
}