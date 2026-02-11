import { useState } from "react";
import DatePicker from "react-datepicker";

export default function DateTimePicker({value , onChange}) {

  return (
    <DatePicker
      selected={value ? new Date(value) : null}
      onChange={onChange}
      showTimeSelect
      dateFormat="Pp"
      showYearDropdown
      showMonthDropdown
      dropdownMode="select" 
      scrollableYearDropdown
      yearDropdownItemNumber={50}
      className="outline-none"
    />
  );
}

