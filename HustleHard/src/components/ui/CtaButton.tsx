import styles from './CtaButton.module.css'

type CtaButtonProps = {
    buttonClassName: string;
    buttonText: string;
    svgPath?: string;
    onClick?: () => void;
}

export default function CtaButton({ buttonClassName = "buttonDefault", buttonText, svgPath, onClick }: CtaButtonProps) {
    return (
        <button className={styles[buttonClassName]} onClick={onClick}>
            {
                svgPath && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d={svgPath} />
                    </svg>
                )
            }

            <span className={buttonClassName === 'buttonAi' ? styles.aiText : ''}>{buttonText}</span>
        </button>
    )
}