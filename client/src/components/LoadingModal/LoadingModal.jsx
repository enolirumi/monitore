import styles from './Style/LoadingModal.module.scss'

export default function LoadingModal({ loading, setLoading }) {
    return (
        <>
            <div className={`${styles['modalLoading']} ${loading ? styles['open'] : ''}`}>
                <img src="../../../public/gif/loading.gif" alt="" />
            </div>
            <div className={`${styles['background']} ${loading ? styles['open'] : ''}`}></div>
        </>
    )
}