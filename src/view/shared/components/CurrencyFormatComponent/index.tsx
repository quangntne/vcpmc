import React from 'react';
import CurrencyFormat from 'react-currency-format';

interface ICurrencyFormatComponent {
    value: number,
    type?: string,
    suffix?: string
}

const CurrencyFormatComponent = (props: ICurrencyFormatComponent) => {
    return (
        <>
            <CurrencyFormat
                value={props.value}
                displayType={props?.type || 'text'}
                thousandSeparator={"."}
                decimalSeparator={","}
                suffix={props?.suffix} />
        </>
    )
}

export default CurrencyFormatComponent;
