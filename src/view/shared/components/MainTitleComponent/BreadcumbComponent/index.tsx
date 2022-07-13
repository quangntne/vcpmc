import React, { useEffect } from 'react';
import Icon, { RightOutlined } from '@ant-design/icons';
import { useTranslate } from '@hook/useTranslate';
import { common } from '@translateKey/index';
import { Link } from 'react-router-dom';
import { UilAngleRight } from '@iconscout/react-unicons';
import { memo } from 'react';

interface Breadcrumbs {
	name: string;
	href?: string;
}
interface props {
	className?: any;
	breadcrumbs: Breadcrumbs[];
}
const BreadcumbComponent = ({ breadcrumbs, className = '' }: props) => {
	const { HOME } = useTranslate('common');
	return (
		<div className={`breadcb ${className}`}>
			<span className="breadcb__li">
				<Link to="/">
					{HOME}
				</Link>
			</span>
			{breadcrumbs.map(({ name, href }, index) => {
				let lastBreadcumb = index + 1 == breadcrumbs.length;
				let classNameBreadcumb = "";
				if (lastBreadcumb == true) {
					classNameBreadcumb = 'breadcb__last';
				}
				return (
					<React.Fragment key={index}>
						<span className="breadcb__icon">
							<Icon component={UilAngleRight} />
						</span>
						<span className={`breadcb__li ${classNameBreadcumb} `}>
							<Link to={!lastBreadcumb ? href : undefined}>
								{name}
							</Link>
						</span>
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default memo(BreadcumbComponent);
