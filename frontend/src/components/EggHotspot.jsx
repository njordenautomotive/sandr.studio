export default function EggHotspot({ message, children, style = {}, className = "" }) {
  return (
    <span className={`egg-hotspot ${className}`} style={style} data-cursor data-cursor-label="Easter egg">
      <span className="egg-tip">{message}</span>
      {children}
    </span>
  );
}
