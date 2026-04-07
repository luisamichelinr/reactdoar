import css from './Input.module.css'

export default function Input({input, alterarInput, tamanho = 'normal', label, type, placeholder, required = false, maxLength, minLength, soNumeros = false}) {

    return (
        <div className={css.inputGroup}>
            <label className={css.label}>{label}</label>
            <input
                className={css[tamanho]}
                type={type}
                onChange={alterarInput}
                value={input}
                required={required}
                placeholder={placeholder}
                maxLength={maxLength}
                minLength={minLength}
            />
        </div>
    )
}