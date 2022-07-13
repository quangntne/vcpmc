import React, { useState } from 'react';
import { common } from '@translateKey/index';
import { useTranslate } from '@view/shared/hook/useTranslate';
import lodash from 'lodash';
import * as Icon from 'react-feather';

interface Iprops {
	onChange?: (value) => void;
	onClick?: (value) => void;
	classNames?: string;
	placeholder?: string;
	onSearch?: (value) => void;
}

const SearchComponent = (props: Iprops) => {
	const { classNames } = props;
	const [valueInput, setValueInput] = useState<string|undefined>();
	const { SEARCH } = useTranslate('common');
	const onClickKeyDown = (event: any) => {
		if (event.keyCode === 13 && props.onClick) {
			props.onClick(valueInput);
		}
	};

  const onSearch= React.useMemo(()=>{
    return  lodash.debounce((text) => {
			props.onSearch&&props.onSearch(text);
		}, 800);
  },[props.onSearch])

	React.useEffect(() => {
    if(valueInput==null){
      return;
    }
		onSearch(valueInput);
		return () => {
			onSearch.cancel();
		};
	}, [valueInput]);

	const onChange = (e) => {
		const text = e.target.value;
		setValueInput(text);
		props.onChange && props.onChange(e);
	};

	return (
		<div className={`search-bar search-category  ${classNames ? classNames : ''}`}>
			<input
				type="text"
				className="form-search ant-form-search"
				onChange={onChange}
				onKeyDown={onClickKeyDown}
				placeholder={
          props.placeholder
            ? props.placeholder + "..."
            : SEARCH + "..."
        }
			/>
			<a className="icon-search" onClick={() => props.onClick(valueInput)}>
				<Icon.Search className="text-white" />
				{/*<UilSearch color={"#fff"} size={25}/>*/}
			</a>
		</div>
	);
};

export default SearchComponent;
