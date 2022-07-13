import { Tooltip } from 'antd';
import React from 'react';
import { memo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IActivePath, IListNav } from './_nav';

interface IMenu {
	data: IListNav;
	active: string;
	language: string;
}

const Item: React.FC<IMenu> = (props: IMenu) => {
	const { language, active } = props;
	const item = props.data;
	if (item.children) {
		return (
			<div className={`menu--component--item ${active} three-dot `} key={item.path}>
				<div className="item-label">
					<span className="item-hover__icon">{item.icon}</span>
					<span className="item__nav">{item.title[language]}</span>
					<span className="icon-3dot">
						<i
							style={{ transform: `rotate(90deg)` }}
							className="fa fa-ellipsis-h icon-3dot"
							aria-hidden="true"
						/>
					</span>
				</div>
				<div className="dropdown-3dot">
					{item.children.length > 1 &&
						item.children.map((linkNav: IActivePath, index) => {
							return (
								<NavLink key={index} to={linkNav.path} className="dropdown-3dot__item">
									{linkNav.title[language]}
								</NavLink>
							);
						})}
				</div>
			</div>
		);
	}

	return (
		<div className={`menu--component--item ${active} `} key={item.path}>
			<Link to={item.path} className="item-label">
				<span className="item-hover__icon">{item.icon}</span>
				<Tooltip title={item.title[language]} placement="right">
					<span className="item__nav">{item.title[language]}</span>
				</Tooltip>
			</Link>
		</div>
	);
};

export default memo(Item);
