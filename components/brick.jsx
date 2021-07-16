import styles from "../styles/brick.module.css"
import Cinema from "../components/Cinema"

function Brick({
  post,
  position,
  width,
  height,
  lastElementRef,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  return (
    <div
      className={styles.brick}
      style={{
        width,
        height,
        top: position.top,
        left: position.left,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={lastElementRef}
    >
      {post.is_video ? (
        <div>
          <Cinema
            src={post.url}
            // onClick={(t: string) => {
            //   onBrickClick(i, t)
            // }}
          ></Cinema>
        </div>
      ) : (
        <img className={styles.media} src={post.url} onClick={onClick} />
      )}
    </div>
  )
}
export default Brick
