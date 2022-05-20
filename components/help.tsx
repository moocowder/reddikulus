import styles from "../styles/help.module.css"

interface Props {
  onMouseDown: () => void
}

function Help({ onMouseDown }: Props) {
  const general = [
    { action: "Next", value: "Right click , o , →" },
    { action: "Previous", value: "Left click , u , ←" },
    { action: "Toggle full screen", value: "f" },
    { action: "Show/hide post infos", value: "i" },
    { action: "Zoom in/out", value: "Mouse wheel" },
    { action: "Exit", value: "Middle click , ESC" },
  ]

  const player = [
    { action: "Play/pause", value: "Space , k" },
    { action: "Rewind 5 seconds", value: "j" },
    { action: "Fast forward 5 seconds", value: "l" },
    { action: "Mute/unmute", value: "m" },
    { action: "Select highest quality", value: "h" },
    { action: "Increase playback speed", value: ">" },
    { action: "Decrease playback speed", value: "<" },
    { action: "Reset playback speed to normal", value: "." },
  ]
  return (
    <div className={styles.help} onMouseDown={onMouseDown}>
      <div className={styles.container}>
        <h5>General :</h5>
        <ul>
          {general.map((s) => (
            <li>
              <span>{s.action}</span>
              <span>{s.value}</span>
            </li>
          ))}
        </ul>
        <h5>Video player :</h5>
        <ul>
          {player.map((p) => (
            <li>
              <span>{p.action}</span>
              <span>{p.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Help
