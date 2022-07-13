import { useTranslate } from "@view/shared/hook/useTranslate";
import { Badge } from "antd";
import React from "react";

const _RenderStatus = ({ status }: { status: number }) => {
	const { New, Expired, Time_Left, Canceled } = useTranslate('aucontractTranslateKey');
	switch (status) {
		case 1:
			return <Badge status="success" text={New} />;
		case 2:
			return <Badge status="processing" text={Time_Left} />;
		case 3:
			return <Badge status="default" text={Expired} />;
		case 4:
			return <Badge status="error" text={Canceled} />;
	}
};

export default React.memo(_RenderStatus)