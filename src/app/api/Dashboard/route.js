import { headers } from "next/headers";

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const act = searchParams.get('act')
  const offset = searchParams.get('offset')
  const limit = searchParams.get('limit')
  const search = searchParams.get('search')
  const containerId = searchParams.get('containerId')
  const sort = searchParams.get('sort')
  const sortType = searchParams.get('sortType')

  const inActive = searchParams.get('inActive')


  let path = ''

  switch (act) {
    case 'list':
      path = "Dashboard/getAccountList"
      break;
    case 'successBlast':
      path = 'Dashboard/getAccountSuccessSummary'
      break;
    default:
      path = ''
  }

  if (path) {
    const headerList = headers()
    let clientIp = headerList.get('x-forwarded-for').split(':')
    clientIp = clientIp[clientIp.length - 1];

    let body = { offset, limit, search: '' }
    if (search) body = { ...body, search }
    if (containerId) body = { ...body, containerId }
    if (inActive) body = { ...body, inActive: true }
    if (sort && sortType) body = {
      ...body, sort: {
        [sort]: +sortType
      }
    }

    let params = JSON.stringify({
      'username': 'admin',
      clientIp,
      params: body
    })


    try {
      const response = await fetch('http://' + process.env.API_HOST + '/api/' + path, {
        method: 'POST',
        headers: new Headers({
          'Authorization': "Basic " + btoa(process.env.API_USERNAME + ':' + process.env.API_PASSWORD),
          'Content-Type': 'application/json'
        }),
        body: params,
        mode: 'cors',
        cache: 'default'
      })

      const list = await response.json()

      return new Response(JSON.stringify(list))
    }
    catch (error) {
      return new Response(JSON.stringify({ object: 'error' }))
    }
  } else {
    return new Response(JSON.stringify({ "code": -2, "content": null, "message": "Invalid URL" }))
  }
}

export async function POST(req) {
  const { searchParams } = new URL(req.url)
  const act = searchParams.get('act')

  let path = ''

  switch (act) {
    case 'list':
      path = "Dashboard/getAccountList"
      break;
    default:
      path = ''
  }

  if (path) {
    const headerList = headers()
    let clientIp = headerList.get('x-forwarded-for').split(':')
    clientIp = clientIp[clientIp.length - 1]
    let bodyReq = await req.json()

    let params = {
      'username': null,
      clientIp,
      params: bodyReq
    }

    const response = await fetch('http://' + process.env.API_HOST + '/api/' + path, {
      method: 'POST',
      headers: new Headers({
        'Authorization': "Basic " + btoa(process.env.API_USERNAME + ':' + process.env.API_PASSWORD),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(params),
      mode: 'cors',
      cache: 'default'
    })

    const data = await response.json()
    console.log(data)

    return new Response(JSON.stringify(data))
  } else {
    return new Response(JSON.stringify({ 'code': -2, 'content': null, 'message': 'Invalid URL' }))
  }
}
