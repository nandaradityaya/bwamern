export default (number) => {
  const formatNumbering = new Intl.NumberFormat("id-ID"); //ini API bawaan browser jadi gaperlu import2 lagi
  return formatNumbering.format(number); //di format numbernya
}; //func numberFormat nerima parameter number
