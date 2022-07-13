import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import "./styles.scss";
import ReactPlayer, { ReactPlayerProps } from "react-player";

interface IProps extends ReactPlayerProps {


}

const LazyLoadVideoAudio = (props: IProps) => {
    const [rendered, setRendered] = useState(true);

    return <div className={props.className || "react-player"}>
        {/* {rendered && <Skeleton.Avatar
            className={"skeleton "}
            style={{ width: "100%", height: "100%" }}
            active={true}
            size={"large"}
            shape={"square"}
            key={"skeleton"}
        ></Skeleton.Avatar >} */}
        {
            props.url &&
            <ReactPlayer
            playing={true}
                key={"react-player"}
                className={props.className || undefined}
                config={{
                    youtube: {
                        playerVars: { showinfo: 1 }
                    }
                }}

                onReady={() => setRendered(false)}

                previewTabIndex={1}
                {...props}
            >
                {props.children}
            </ReactPlayer>
        }
    </div>


};

export default LazyLoadVideoAudio;
