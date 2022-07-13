import { routerPlaylist } from '@config/path';
import { RootState } from '@modules/core/store/redux';
import { translate, useTranslate } from '@view/shared/hook/useTranslate';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const ColumnPlaylist = () => {
	const history = useHistory();
	const lang = useSelector((state: RootState) => state.translateStore.currentLanguage);
	const { DETAIL } = useTranslate('playlistTranslateKey');
	const column = [
		{
			title: 'TITLE',
			dataIndex: 'playlistName',
		},
		{
			title: 'NUMBER_MEDIA',
			dataIndex: 'totalMedia',
		},
		{
			title: 'DURATION',
			dataIndex: 'playlistDuration',
		},
		{
			title: 'TOPIC',
			dataIndex: 'topics',
			render: (text, record) => {
				return (
					<div className="d-flex">
						{record.topics.map((r, index) => {
							return (
								<div className="topic-box" key={index}>
									<p className="table-box">{r}</p>
								</div>
							);
						})}
					</div>
				);
			},
		},
		{
			title: 'CREATE_AT',
			dataIndex: 'playlistCreateAt',
		},
		{
			title: 'CREATOR',
			dataIndex: 'userCreate',
		},
		{
			key: 'action',
			dataIndex: 'action',
			render: (text, record) => (
				<a
					className="link-table"
					onClick={() => {
            history.push(`${routerPlaylist.PLAYLIST}/${record.playlistId}`);
					}}
				>
					{DETAIL}
				</a>
			),
		},
	];
	const translateCol = column.map((item) => {
		const title = translate('playlistTranslateKey', item.title, lang);
		return { ...item, title };
	});
	return translateCol;
};

export default ColumnPlaylist;
