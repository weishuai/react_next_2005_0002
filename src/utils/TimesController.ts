import _ from 'lodash';
import { useState } from 'react';
export class TimesController {
   
 getTimesFormat(d:Date){
    var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
     return times;
    }
 getTimesFormatShort(d:Date){
        var times=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
         return times;
   }
}