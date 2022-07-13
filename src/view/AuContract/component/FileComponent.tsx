
import { FileExcelOutlined,FilePdfOutlined,FileWordOutlined,FileImageOutlined,FilePptOutlined,FileZipOutlined, FileUnknownOutlined } from "@ant-design/icons";
import React from "react";
import { Typography } from 'antd';
import { LinkProps } from "antd/lib/typography/Link";
const { Link } = Typography;
const fileExtensionPattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi

const files={
    ".xlsl":<FileExcelOutlined className="mr-2" style={{color:'white', fontSize:"1.1rem",}}/>,
    ".xls":<FileExcelOutlined className="mr-2" style={{color:'white', fontSize:"1.1rem",}}/>,
    ".pdf":<FilePdfOutlined className="mr-2" style={{color:'white', fontSize:"1.1rem",}}/>,
    ".doc":<FileWordOutlined className="mr-2" style={{color:'white', fontSize:"1.1rem",}}/>,
    ".docx":<FileWordOutlined className="mr-2" style={{color:'white', fontSize:"1.1rem",}}/>,
    ".png":<FileImageOutlined className="mr-2" style={{color:'white', fontSize:"1.1rem",}}/>,
    ".ppt":<FilePptOutlined className="mr-2" style={{color:'white', fontSize:"1.1rem",}}/>,
    ".zip":<FileZipOutlined className="mr-2" style={{color:'white', fontSize:"1.1rem",}}/>
}

interface IFileProps extends LinkProps{
    fileName:string,
    filePath:string,
}

const _RenderFile = (props:IFileProps) => {
    const ext=props.fileName.match(fileExtensionPattern)[0]
    console.log(ext)
	return <Link {...props} href={props.filePath}>{files[ext.toLowerCase()]||<FileUnknownOutlined style={{color:'white', fontSize:"1.1rem",}} className="mr-2" />}{props.fileName}</Link>
};

export default React.memo(_RenderFile)