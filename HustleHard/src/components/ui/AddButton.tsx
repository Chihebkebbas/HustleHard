import styles from './AddButton.module.css'

type AddButtonProps = {
    onClick: () => void
    children: JSX.Element
}

export default function AddButton({children, onClick}: AddButtonProps) {
    return (
        <button className={styles.btnAdd} onClick={onClick}>
            <span style={{fontSize: '1.2rem', lineHeight: '1'}}>+</span> {children}
        </button>
    )
}