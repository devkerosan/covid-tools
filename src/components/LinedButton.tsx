import React, { ReactNode } from "react";

type Props = {
    children?: ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const LinedButton: React.FC<Props> = (props) => {
    const defaultStyle = "items-end border-2 font-bold rounded-full px-4 py-1 border-black transition ease-in-out hover:bg-black hover:text-white active:bg-black active:scale-95 duration-300";
    return (
        <button className={defaultStyle} onClick={props.onClick}>{props.children}</button>

    )
};

export default LinedButton;