import 'regenerator-runtime/runtime';
import 'core-js/stable';
import {TIMEOUT_SEC} from './config.js';

const timer = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`took too long time. please try again!`));
    }, 1000*s)
  });
}

export const AJAX = async function(url, uploadData = undefined) {
  try {
    const POSTDATA = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadData)
    }

    const fetchPro = uploadData ? fetch(url, POSTDATA) : fetch(url);
    const res = await Promise.race([fetchPro, timer(TIMEOUT_SEC)]);
    const data = await res.json();

    if(!res.ok) throw new Error(`💥 ${data.message}, ${res.status}`);
    return data;
  } catch(err) {
    throw err;
  }
}

// export const getJSON = async function(url) {
//   try {
//     const res = await Promise.race([fetch(url), timer(TIMEOUT_SEC)]);

//     const data = await res.json();
//     if(!res.ok) throw new Error(`💥 ${data.message}, ${res.status}`);
//     return data;
//   } catch(err) {
//     throw err;
//   }
// }

// export const sendJSON = async function(url, uploadData) {
//   try {
//     const res = await Promise.race([fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(uploadData)
//     }), timer(TIMEOUT_SEC)]);

//     const data = await res.json();
//     if(!res.ok) throw new Error(`💥 ${data.message}, ${res.status}`);
//     return data;
//   } catch(err) {
//     throw err;
//   }
// }
