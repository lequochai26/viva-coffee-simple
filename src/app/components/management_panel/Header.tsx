import Button from "../Button";
import InputField from "../InputField";

// Interfaces:
interface HeaderProps {
    keyword: string;
    onAdd?(): void;
    onDelete?(): void;
    onKeywordChange?(event: any): void;
    onSearch?(): void;
    onReload?(): void;
}

// Main component:
export default function Header({ keyword, onAdd, onDelete, onKeywordChange, onSearch, onReload }: HeaderProps) {
    return (
        <div className="block widthFitParent height37px backgroundWhite borderBlackThin borderTopNone">
            {/* Ruler */}
            <div className="ruler"></div>

            {/* Add button */}
            <Button type="normal" value="Thêm" className="inlineBlock verticalAlignMiddle fontSize12px marginLeft10px" onClick={onAdd} />

            {/* Remove button */}
            <Button type="normal" value="Xóa" className="inlineBlock verticalAlignMiddle fontSize12px marginLeft10px" onClick={onDelete} />

            {/* Keyword input field */}
            <InputField type="text" name="searchKeyword" value={keyword} placeholder="Từ khóa tìm kiếm" className="inlineBlock width350px verticalAlignMiddle fontSize12px marginLeft10px borderBlackThin borderRadius5px" onChange={onKeywordChange} />

            {/* Search button */}
            <Button type="normal" value="Tìm kiếm" className="inlineBlock verticalAlignMiddle fontSize12px marginLeft10px" onClick={onSearch} />

            {/* Reload button */}
            <Button type="normal" value="Tải lại" className="inlineBlock verticalAlignMiddle fontSize12px marginLeft10px" onClick={onReload} />
        </div>
    )
}