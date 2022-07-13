import React from "react";
import { memo } from "react";
interface Iprops {
  title: any;
  className?: string;
  style?: React.CSSProperties;
  index?: number;
}
const TitleComponent = (props: Iprops) => {
  const className = props?.index == 2 ? 'secondary-title' : 'main-title';
  return (
    <p className={`${className} ${props.className}`} style={props.style}>
      {props.title}
    </p>
  );
};

export default memo(TitleComponent);
