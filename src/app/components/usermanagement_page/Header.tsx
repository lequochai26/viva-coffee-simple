import InputField from "../InputField";
import LocalButton from "./LocalButton";

// Interfaces:
interface HeaderProps {
    searchKeyword?: string;
    onSearchKeywordChange?(event: any): void;
    onSearchButtonClick?(): void;
    onReloadButtonClick?(): void;
    onAddButtonClick?(): void;
}

// Main component:
export default function Header({ searchKeyword, onSearchKeywordChange, onSearchButtonClick, onReloadButtonClick, onAddButtonClick }: HeaderProps) {
    // View:
    return (
        <div className="block widthFitParent height37px borderBlackThin borderTopNone">
            {/* Ruler */}
            <div className="ruler"></div>

            {/* Add button */}
            <LocalButton type="normal" value="Thêm" className="inlineBlock verticalAlignMiddle marginLeft10px" onClick={onAddButtonClick} />

            {/* Remove button */}
            <LocalButton type="normal" value="Xóa" className="inlineBlock verticalAlignMiddle marginLeft10px" />

            {/* Search input field */}
            <InputField type="text" name="searchKeyword" value={searchKeyword} placeholder="Tìm kiếm" onChange={onSearchKeywordChange} className="marginLeft10px fontSize12px borderBlackThin borderRadius5px width350px" />

            {/* Search button */}
            <LocalButton type="normal" value="Tìm kiếm" className="inlineBlock verticalAlignMiddle marginLeft10px" onClick={onSearchButtonClick} />

            {/* Reload button */}
            <LocalButton type="normal" value="Tải lại" className="inlineBlock verticalAlignMiddle marginLeft10px" onClick={onReloadButtonClick} />
        </div>
    );
}