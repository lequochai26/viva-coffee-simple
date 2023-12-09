interface InputFieldProps {
    type: string;
    name: string;
    value: any;
    onChange?(event: any): void;
    placeholder?: string;
    className?: string;
    required?: boolean;
    min?: number;
    max?: number;
}

export default function InputField({ type, name, value, onChange, placeholder, className, required, min, max }: InputFieldProps) {
    // Class name definition
    className = `width200px heightFitContent padding5px fontSize17px fontFamilyInherit ${className}`;

    // View
    return (
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className={className} required={required} min={min} max={max} />
    );
}