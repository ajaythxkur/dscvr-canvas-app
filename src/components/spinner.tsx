interface SpinnerProps {
    height?: number;
    width?: number;
}
const animationDuration =`2s`;
export function Spinner({ height, width }: SpinnerProps) {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="spinner-border" role="status" style={{ animationDuration: animationDuration, height: height ? `${height}px` : "100px", width: width ? `${width}px` : "100px" }}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}