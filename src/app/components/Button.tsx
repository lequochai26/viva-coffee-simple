export interface ButtonProps {
    type: "normal" | "normalInForm" | "submit";
    value: string;
    onClick?(): void;
    className?: string;
}

export default function Button({ type, value, onClick, className }: ButtonProps) {
    // Classname definition
    className = `widthFitContent heightFitContent backgroundWhite borderBlackThin borderRadius5px fontFamilyInherit fontSize15px padding5px paddingLeft10px paddingRight10px cursorPointer ${className}`;

    // View
    switch (type) {
        case 'normal': return (
            <button onClick={onClick} className={className}>
                { value }
            </button>
        );

        case 'normalInForm': return (
            <input type="button" value={value} className={className} onClick={onClick} />
        )

        case'submit': return (
            <input type="submit" value={value} className={className} />
        );
    }
}