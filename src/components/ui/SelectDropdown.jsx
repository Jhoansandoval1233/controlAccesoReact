const SelectDropdown = ({ label, value, onChange, options }) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <select className="form-select" value={value} onChange={onChange}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectDropdown;