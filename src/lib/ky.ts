import ky from "ky";

//ky ile oluşturulan istemcinin JSON yanıtlarındaki tarih anahtarlarını otomatik olarak Date nesnelerine dönüştürmesini sağlar.
const kyInstance = ky.create({
  parseJson: (text) =>
    JSON.parse(text, (key, value) => {
      if (key.endsWith("At")) return new Date(value);
      return value;
    }),
});

export default kyInstance;