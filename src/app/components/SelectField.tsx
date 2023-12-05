interface SelectFieldProps {
    name: string;
    value: string[];
    selecting?: string;
    onChange?(event: any): void;
    placeholder?: string;
    className?: string;
}

export default function SelectField({ name, value, selecting, onChange, placeholder, className }: SelectFieldProps) {
    // Class name definition
    className = `width200px heightFitContent padding5px fontSize17px fontFamilyInherit ${className}`;

    // View
    return (
        <select name={name} value={selecting} onChange={onChange} placeholder={placeholder} className={className}>
            {
                value.map(
                    function (str: string, index: number) {
                        return (
                            <option key={index} value={str}>
                                {str}
                            </option>
                        )
                    }
                )
            }
        </select>
    );
}