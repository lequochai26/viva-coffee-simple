// Interfaces:
interface ContentAreaViewPortProps {
    content: JSX.Element;
}

// Main component:
export default function ContentAreaViewPort({ content }: ContentAreaViewPortProps) {
    return (
        <div className="block widthFitParent" style={{ height: 'calc(100% - 50px)' }}>
            { content }
        </div>
    )
}