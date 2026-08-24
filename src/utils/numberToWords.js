/**
 * Convert numeric amount into Indian Currency Words (Lakhs, Thousands, etc.)
 */
export function numberToWordsIndian(num) {
  if (num === null || num === undefined || isNaN(num)) return '';
  let amount = Math.floor(Math.abs(Number(num)));
  if (amount === 0) return 'Zero Rupees Only';

  const singleDigits = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const twoDigits = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tensMultiple = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertTwoDigits(n) {
    if (n === 0) return '';
    if (n < 10) return singleDigits[n];
    if (n < 20) return twoDigits[n - 10];
    const tens = Math.floor(n / 10);
    const units = n % 10;
    return `${tensMultiple[tens]}${units ? ' ' + singleDigits[units] : ''}`;
  }

  function convertThreeDigits(n) {
    if (n === 0) return '';
    const hundred = Math.floor(n / 100);
    const remainder = n % 100;
    let str = '';
    if (hundred > 0) {
      str += `${singleDigits[hundred]} Hundred`;
    }
    if (remainder > 0) {
      if (str) str += ' ';
      str += convertTwoDigits(remainder);
    }
    return str;
  }

  let crore = Math.floor(amount / 10000000);
  amount %= 10000000;

  let lakh = Math.floor(amount / 100000);
  amount %= 100000;

  let thousand = Math.floor(amount / 1000);
  amount %= 1000;

  let hundredAndBelow = amount;

  let res = '';

  if (crore > 0) {
    res += `${convertTwoDigits(crore)} Crore `;
  }
  if (lakh > 0) {
    res += `${convertTwoDigits(lakh)} Lakh `;
  }
  if (thousand > 0) {
    res += `${convertTwoDigits(thousand)} Thousand `;
  }
  if (hundredAndBelow > 0) {
    res += `${convertThreeDigits(hundredAndBelow)} `;
  }

  return res.trim() + ' Rupees Only';
}
