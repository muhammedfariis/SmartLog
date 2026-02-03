import { useState } from "react";
import DatePicker from "react-datepicker";

export default function DateTimePicker() {
  const [value, setValue] = useState(null);

  return (
    <DatePicker
      selected={value}
      onChange={(v) => setValue(v)}
      showTimeSelect
      dateFormat="Pp"
      className="outline-none"
    />
  );
}

