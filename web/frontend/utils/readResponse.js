// function binArrayToJson

// * desc
// * a function that converts a binary array to JSON
// * used for converting shopify useAuthenticatedFetch requests to JSON

// ? params
// ? binArray <bin[]>

// ! returns
// ! JSON <json>

export var binArrayToJson = function (binArray) {
  var str = "";
  for (var i = 0; i < binArray.length; i++) {
    str += String.fromCharCode(parseInt(binArray[i]));
  }
  return typeof str == "string" ? str : JSON.parse(str);
};

// function readResponse

// * desc
// * a function that converts a readable stream into an object
// * used for converting shopify useAuthenticatedFetch responses to Javascript objects

// ? params
// ? readableStream <readableStream>

// ! returns
// ! data <object>

const readResponse = async (readableStream) => {
  const reader = readableStream.getReader();

  let data = null;

  const read = await reader.read();

  function pump({ done, value }) {
    if (done) {
      return;
    }

    data = JSON.parse(binArrayToJson(value));

    return reader.read().then(pump);
  }

  pump(read);

  return data;
};

export default readResponse;
