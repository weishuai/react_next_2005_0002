import { BaseController } from '../utils/BaseController';
//import API from '../json/fhcrm.json';
import { FHuserVo } from '../stores/FHuser';
export class FHuserController extends BaseController {
  async removeFHuser(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      ///this.api(//API.fhcrm.FHUser.removeFHUser).pathParam({ Id: id }).call();
    });
    ///this.success();
  }
  async getFHUserAllView(Ids: string[]) {
    const numbers = Ids;
    const listItems = numbers.map((id) => {
      ///this.api(//API.fhcrm.FHUser.getFHUserAllView).call();
    });
    ///this.success();
  }

  async markFHuser(Ids: string[]) {
   /// await this.api(//API.fhcrm.FHUser.getFHUserById).call(Ids);
  }

  async getPoolsAll() {
   // const FHuser = this.api(//API.fhcrm.FHUser.getFHUserAll).call();
   /// console.log('FHuser:' + FHuser);
   /// return FHuser;
  }

  async getPoolsAllView() {
    ///const FHuser = this.api(//API.fhcrm.FHUser.getFHUserAllView).call();
    ///console.log('FHuser:' + FHuser);
    ///return FHuser;
  }

  async updateFHuserv2(language: FHuserVo) {
    /*
    try {
      await this.api(//API.fhcrm.FHUser.updateaFHUser).pathParam({ Id: language.id }).call(language);
      ///this.success();
    } catch (error: any) {
      ///this.alert(error.message, 'Error');
    }
    */
  }



}
