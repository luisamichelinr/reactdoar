import css from './Select.module.css'
import { useState } from 'react'

export default function Select({options = [], label, required = false }) {
    const [valor, setValor] = useState('')

    function alterar(e) {
        setValor(e.currentTarget.value)
    }

    return (
        <div className={css.selectGroup}>
            <label className={css.titulo}>{label}</label>
            <select className={css.select1} onChange={alterar} value={valor} required={required}>
                {options.map((opt, i) => (
                    <option key={i} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    )
}