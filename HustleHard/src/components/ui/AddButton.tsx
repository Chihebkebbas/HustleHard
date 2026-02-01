import styles from './AddButton.module.css'

type AddButtonProps = {
    children: JSX.Element
}

export default function AddButton({children}: AddButtonProps) {
    return (
        <button className={styles.btnAdd}>
            <span style={{fontSize: '1.2rem', lineHeight: '1'}}>+</span> {children}
        </button>
    )
}