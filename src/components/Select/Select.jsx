import css from './Select.module.css'

export default function Select({ options = [], label, required = false, value = '', onChange = null }) {
    return (
        <div className={css.selectGroup}>
            <label className={css.titulo}>{label}</label>
            <select 
                className={css.select1} 
                onChange={onChange} 
                value={value} 
                required={required}
            >
                <option value="" disabled>Selecione uma opção</option>
                {options.map((opt, i) => (
                    <option key={i} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    )
}
