/*
 * Функция `convertBytesToHuman` должна принимать
 * аргумент `bytes` только числового типа.
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  if (typeof bytes != "number" || bytes < 0 || !Number.isInteger(bytes)) {
    return; //returns undefined
  }

  let power = 0;
  const KB_SIZE = 1024;

  while (bytes >= KB_SIZE) {
    bytes = (bytes / KB_SIZE).toFixed(2);
    power++;
  }

  let suffix;
  switch (power) {
    case 0:
      suffix = "B";
      break;
    case 1:
      suffix = "KB";
      break;
    case 2:
      suffix = "MB";
      break;
    case 3:
      suffix = "GB";
      break;
    case 4:
      suffix = "TB";
      break;
    default:
      suffix = "_B";
  }

  return bytes + suffix;
}
