import { useTranslate } from "@view/shared/hook/useTranslate";
import { Badge } from "antd";
import React from "react";

const _RenderStatusMedias = ({ status }: { status: number }) => {
    const { New, Expired, Time_Left, Canceled } = useTranslate('aucontractTranslateKey');
    switch (status) {
        case 0:
            return <Badge status="success" text={New} />;
        case 1:
            return <Badge status="processing" text="Đã phê duyệt" />;
        case -1:
            return <Badge status="error" text="Bị từ chối" />;
    }
};

export default React.memo(_RenderStatusMedias)