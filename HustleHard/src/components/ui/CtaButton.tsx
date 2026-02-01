import styles from './CtaButton.module.css'

type CtaButtonProps = {
    buttonClassName: string,
    buttonText: string,
    svgPath?: string,
}

export default function CtaButton({ buttonClassName = "buttonDefault", buttonText, svgPath }: CtaButtonProps) {
    return (
        <button className={styles[buttonClassName]}>
            {
                svgPath && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d={svgPath}/>
                    </svg>
                )
            }

            <span className={styles.aiText}>{buttonText}</span>
        </button>
    )
}