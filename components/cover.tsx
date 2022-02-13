import styles from "../styles/cover.module.css"

interface Props {
  banner?: string
  icon?: string
  avatar?: string
  color?: string
}

function Cover({ banner, icon, avatar, color }: Props) {
  return (
    <>
      {(icon || avatar || banner) && (
        <div
          className={styles.wrapper}
          // style={{
          //   background: !banner
          //     ? `linear-gradient(180deg,${color},#00000000)`
          //     : "",
          // }}
        >
          {banner && <img className={styles.banner} src={banner} alt="" />}
          {avatar && <img className={styles.avatar} src={avatar} alt="" />}
          {!avatar && icon && (
            <div className={styles.icon}>
              <img src={icon} alt="" />
            </div>
          )}
        </div>
      )}
    </>
  )
}
export default Cover
