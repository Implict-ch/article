interface Props {
  schoolSize: number;
  onSchoolSizeChange(px: number): void;
  min?: number;
  max?: number;
}

export function SettingsPanel({
  schoolSize,
  onSchoolSizeChange,
  min = 18,
  max = 40,
}: Props) {
  return (
    <aside className="settings-panel" data-no-advance aria-label="显示设置">
      <h2 className="settings-panel__title">显示设置</h2>
      <label className="settings-panel__field" htmlFor="school-size">
        <span className="settings-panel__label">学校字号</span>
        <span className="settings-panel__value">{schoolSize}px</span>
      </label>
      <input
        id="school-size"
        className="settings-panel__range"
        type="range"
        min={min}
        max={max}
        step={1}
        value={schoolSize}
        onChange={(e) => onSchoolSizeChange(Number(e.target.value))}
      />
      <p className="settings-panel__hint">拖动调节卡片内学校名称大小</p>
    </aside>
  );
}
