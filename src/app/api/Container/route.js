import { headers } from 'next/headers'

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const act = searchParams.get('act')
  let containerId = searchParams.get('containerId')
  const offset = searchParams.get('offset')
  const limit = searchParams.get('limit')
  let emptyUser = searchParams.get('emptyUser')
  const search = searchParams.get('search')
  const userId = searchParams.get('userId')
  const sort = searchParams.get('sort')
  const sortType = searchParams.get('sortType')

  let path = ''

  switch (act) {
    case 'list':
      path = 'Container/getContainerList';
      break;
    case 'available':
      path = 'Container/getAvailableContainer';
      break;
    case 'account':
      path = 'Container/getAccountContainer';
      break;
    default:
      path = ''
  }

  if (path) {
    const headerList = headers()
    let clientIp = headerList.get('x-forwarded-for').split(':')
    clientIp = clientIp[clientIp.length - 1]

    let params = {
      'username': null,
      clientIp,
      params: {}
    };

    if (containerId) params.params = { ...params.params, containerId }
    if (offset && limit) params.params = { ...params.params, offset, limit }
    if (userId) params.params = { ...params.params, userId }
    if (search) params.params = { ...params.params, search }
    if (emptyUser) {
      emptyUser = (emptyUser == 0) ? false : true
      params.params = { ...params.params, emptyUser }
    }

    if (sort && sortType) params.params = {
      ...params.params, sort: {
        [sort]: +sortType
      }
    }

    const response = await fetch('http://' + process.env.API_HOST + '/api/' + path, {
      method: 'POST',
      headers: new Headers({
        "Authorization": "Basic " + btoa(process.env.API_USERNAME + ':' + process.env.API_PASSWORD),
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(params),
      mode: 'cors',
      cache: 'default'
    })

    const list = await response.json()
    // console.log(list, 'lisss')

    return new Response(JSON.stringify(list))
  } else {
    return new Response(JSON.stringify({ "code": -2, "content": null, "message": "Invalid URL" }))
  }
}


export async function POST(req) {
  const { searchParams } = new URL(req.url)
  const act = searchParams.get('act')

  let path = ''

  switch (act) {
    case 'setContainer':
      path = 'Instance/setContainer'
      break;
    case 'available':
      path = 'Instance/getAvailableContainer'
      break;
    case 'account':
      path = 'Instance/getAccountContainer'
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
      method: "POST",
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(process.env.API_USERNAME + ':' + process.env.API_PASSWORD),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(params),
      mode: 'cors',
      cache: 'default'
    })

    const data = await response.json()

    return new Response(JSON.stringify(data))
  } else {
    return new Response(JSON.stringify({ 'code': -2, 'content': null, 'message': 'Invalid URL' }))
  }
}