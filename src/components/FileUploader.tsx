import { FolderOpenFilled } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import { ChangeEvent, useState } from "react";

type Props = {
    onChange: (value: any) => void
}

const FileUploader: React.FC<Props> = (props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e);
    }
    return (
        <Tooltip title="インポート" mouseEnterDelay={0} mouseLeaveDelay={0}>
            <label>
                <FolderOpenFilled className="ml-auto text-base rounded-full p-1 transition ease-in-out hover:bg-gray-200 active:bg-gray-300 duration-300" />
                <Input type="file" bordered={false} style={{ display: "none" }} onChange={handleChange}></Input>
            </label>
        </Tooltip>

    )
};

export default FileUploader;