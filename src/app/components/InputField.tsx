interface InputFieldProps {
    type: string;
    name: string;
    value: any;
    onChange?(event: any): void;
    placeholder?: string;
    className?: string;
}

export default function InputField({ type, name, value, onChange, placeholder, className }: InputFieldProps) {
    // Class name definition
    className = `width200px heightFitContent padding5px fontSize17px fontFamilyInherit ${className}`;

    // View
    return (
        <input  type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className={className} />
    );
}