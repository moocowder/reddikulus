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
      {(icon || avatar) && (
        <div
          className={styles.wrapper}
          style={{
            background: !banner
              ? `linear-gradient(180deg,${color},#00000000)`
              : "",
            // background: !banner ? `linear-gradient(180deg,#ff0066,#ff0066)` : "",
            // background: !banner ? color : "",
          }}
        >
          {banner && <img className={styles.banner} src={banner} alt="" />}
          {avatar && <img className={styles.avatar} src={avatar} alt="" />}
          {!avatar && icon && <img className={styles.icon} src={icon} alt="" />}
        </div>
      )}
    </>
  )
}
export default Cover
