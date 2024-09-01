import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';

export const print = async (html) => {
  await Print.printAsync({
    html,
  });
};

export const printToFile = async (html) => {
  const { uri } = await Print.printToFileAsync({ html });
  await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
};
// uriToBlob = (uri) => {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//       // return the blob
//       resolve(xhr.response);
//     };

//     xhr.onerror = function () {
//       // something went wrong
//       reject(new Error('uriToBlob failed'));
//     };
//     // this helps us get a blob
//     xhr.responseType = 'blob';
//     xhr.open('GET', uri, true);

//     xhr.send(null);
//   });
// }
// export const FileToFirstore = async (html) => {
//   const { uri,base64} = await Print.printToFileAsync({ html });
//   const storage = getStorage();
//   const response = await fetch(uri);
//   const blob = await response.blob();
//   var ref = ref(storage,"postDocs/documents/" + Date.now());
//   const uploadTask = uploadBytesResumable(ref, blob);
  // const storageRef = ref("file.pdf");
  // uploadBytes(storageRef,base64,{
  //   contentType: 'image/jpeg',
  // })


//   console.log(uri)

// };

