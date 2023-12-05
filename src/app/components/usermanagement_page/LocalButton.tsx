import Button, { ButtonProps } from "../Button";

export default function LocalButton({ type, value, className, onClick }: ButtonProps) {
    // View:
    return (
        <Button type={type} value={value} className={`fontSize12px ${className}`} onClick={onClick} />
    );
}