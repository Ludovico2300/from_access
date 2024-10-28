function getLocalDateTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Regola per il fuso orario locale
  return now.toISOString().slice(0, 19).replace("T", " ");
}

exports.getLocalDateTime = getLocalDateTime;
