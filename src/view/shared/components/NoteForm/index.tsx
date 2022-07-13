import { useTranslate } from '@view/shared/hook/useTranslate';
import { representativeTranslateKey } from '@view/shared/translateKey';
import React from 'react'

const NoteForm = () => {

    const { NOTE_RED_POINT } = useTranslate("representativeTranslateKey");

    return (
        <div className='note-form quang-tran-form'>
            <span className='point-red' />
            <label style={{ opacity: '0.6' }}>{NOTE_RED_POINT}</label>
        </div>
    )
}

export default NoteForm
