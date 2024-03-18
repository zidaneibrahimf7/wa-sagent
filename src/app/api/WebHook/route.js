export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const act = searchParams.get('act');
  const containerId = searchParams.get('containerId');
  const requestId = searchParams.get('requestId');

  let dest = '';

  switch (act) {
    case "sendMessage":
      dest = "sendMessage";
      break;
    case "submitQr":
      dest = "submitQrCode";
      break;
    case "getQr":
      dest = "getQrCode";
      break;
    case "getMessage":
      dest = "getMessageStatus";
      break;
    default:
      dest = '';
  }

  try {
    if (dest) {
      let params = {
        "action": "WebHook",
        "subAction": dest,
        "clientIp": "127.0.0.1",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        containerId,
        requestId
      }
      const response = await fetch('https://' + process.env.API_WEBHOOK_HOST + '/api-cgi', {
        method: "POST",
        headers: new Headers({
          "Authorization": "Basic " + btoa(process.env.API_WEBHOOK_USERNAME + ':' + process.env.API_WEBHOOK_PASSWORD),
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(params),
        mode: "cors",
        cache: 'default'
      });

      const list = await response.json()
      return new Response(JSON.stringify(list));
    }
    else {
      return new Response(JSON.stringify({ "code": -2, "content": null, "message": "Invalid URL" }))
    }

  } catch (error) {
    console.log('error Message:', error)
  }

}

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const act = searchParams.get('act');

  let dest = ''

  switch (act) {
    case "sendMessage":
      dest = "sendMessage";
      break;
    default:
      dest = '';
  }

  try {
    if (dest) {
      const body = await req.json()
      // console.log(body)
      // let params = {
      //   "action": "WebHook",
      //   "subAction": dest,
      //   // "clientIp": "127.0.0.1",
      //   // "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
      //   params: 
      // }

      // console.log(params)


      const response = await fetch('https://' + process.env.API_WEBHOOK_HOST + '/api-cgi', {
        method: "POST",
        headers: new Headers({
          "Authorization": "Basic " + btoa(process.env.API_WEBHOOK_USERNAME + ':' + process.env.API_WEBHOOK_PASSWORD),
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(body),
        mode: "cors",
        cache: 'default'
      });

      const list = await response.json()
      console.log(req.body, list);
      return new Response(JSON.stringify(list));

    } else {
      return new Response(JSON.stringify({ "code": -2, "content": null, "message": "Invalid URL" }))
    }
  } catch (error) {
    console.log('error message:', error)
  }
}