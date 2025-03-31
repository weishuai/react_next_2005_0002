export const parseParams = {


    setparseParams(data:any) {
        try {
            var tempArr = [];
            for (var i in data) {
                var key = encodeURIComponent(i);
                var value = encodeURIComponent(data[i]);
                if(value!=undefined)
                {
                  tempArr.push(key + '=' + value);
                }
               
            }
            var urlParamsStr = tempArr.join('&');
            return urlParamsStr;
        } catch (err) {
            return '';
        }
    } , 
    /* 
    var obj = {
        name: 'zhangsan',
        age: 100
    };
    
    parseParams(obj); //"name=zhangsan&age=100"   
    */


  getParams(url:any) {
  try {
    url = url.match(/\?([^#]+)/)[1];
    const obj:any = {};
    const arr = url.split('&');
    for (let i = 0; i < arr.length; i++) {
      let subArr = arr[i].split('=');
      let key:string = decodeURIComponent(subArr[0]);
      let value = decodeURIComponent(subArr[1]);
      obj[key] = value;
    }
    return obj;
  } catch (err) {
    return null;
  }
},

getFHParamsTime(url:any)
{
  let fhtime="";
  const fhtimearry=this.getParams(url);
  if(fhtimearry!=null)
  {
    fhtime=fhtimearry["time"];
  }
  console.info('1111:'+fhtime);
  return fhtime;
}

/*
var urlStr = 'http://www.xxx.com/test?name=zhangshan&age=100#hello';
getParams(urlStr); //{name: "zhangshan", age: "100"}
*/

};
