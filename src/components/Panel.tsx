import { ReactNode } from "react";
import { StringMappingType } from "typescript";

type Props = {
    children?: ReactNode;
    color?: string;
    height?: string;
    width?: string;
    title?: string;

}

const Panel: React.FC<Props> = (props) => {
    const defaultStyle = "rounded-md shadow-lg border-t-8 p-2";
    const color = props.color || "border-black";
    const height = props.height || "h-auto";
    const width = props.width || "w-auto";
    const style = defaultStyle.concat(" ", color, " ", height, " ", width);
    return (
        <div className={style}>
            <h1 className="text-2xl font-bold">{props.title}</h1>
            {props.children}
        </div>
    )
};

export default Panel;