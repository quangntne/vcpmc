import React from 'react';
import Icon from '@ant-design/icons';
const PlaylistSvg = () => (
	<svg width="32" height="30" viewBox="0 0 32 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
		<path d="M2.20234 9.2084H24.2257C25.437 9.2084 26.4281 9.81575 26.4281 11.001C26.4281 12.1862 25.437 12.6316 24.2257 12.6316H2.20234C0.991053 12.6316 0 12.1862 0 11.001C0 9.81575 0.991053 9.2084 2.20234 9.2084ZM2.20234 0.333984H24.2257C25.437 0.333984 26.4281 0.815751 26.4281 2.00098C26.4281 3.1862 25.437 3.50098 24.2257 3.50098H2.20234C0.991053 3.50098 0 3.1862 0 2.00098C0 0.815751 0.991053 0.333984 2.20234 0.333984ZM2.20234 17.758H15.4164C16.6277 17.758 17.6187 18.3158 17.6187 19.501C17.6187 20.6862 16.6277 21.2603 15.4164 21.2603H2.20234C0.991053 21.2603 0 20.6862 0 19.501C0 18.3158 0.991053 17.758 2.20234 17.758ZM22.0234 19.47V28.5854C22.0234 29.4259 22.9484 29.9431 23.6972 29.5121L31.4714 24.9436C32.1762 24.5341 32.1762 23.5213 31.4714 23.0903L23.6972 18.5218C23.5272 18.4268 23.3347 18.3771 23.139 18.3776C22.9432 18.3782 22.751 18.429 22.5816 18.5249C22.4122 18.6209 22.2715 18.7587 22.1735 18.9245C22.0756 19.0904 22.0238 19.2784 22.0234 19.47Z" />
	</svg>
);
const PlaylistIcon = (props) => <Icon component={PlaylistSvg} {...props} />;
export default PlaylistIcon;
