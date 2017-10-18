import request from 'request'
import Rx from 'rxjs'
// const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT1Bw7xBeaavCkQHjsciGovUZwOFZQuE4h-Hj4MCO5pY-Dl3fqiHpP9M0KavP_6gvf9uuBDcH1y-SFq/pub?gid=0&single=true&output=tsv'

const parse = (url) => {
  return Rx.Observable.create(obs => {
    request(url, (e, r, b) => {
      if (e)
        return obs.error(e)
      const rta = b.split('\r\n').map(row => row.split('\t')).map(_objWithFirstAsHeader).slice(1)
      obs.next(rta)
      obs.complete()
    })
  })
}

const _objWithFirstAsHeader = (rowAry) => {
  _objWithFirstAsHeader.header = _objWithFirstAsHeader.header || rowAry
  return rowAry.reduce((p, c, i) => ({ [_objWithFirstAsHeader.header[i]]: c, ...p }), {})
}

export { parse }