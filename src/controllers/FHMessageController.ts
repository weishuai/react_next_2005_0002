///import {SocketController, OnMessage, MessageBody} from "socket-controllers";
///import { BaseController } from '../utils/BaseController';
/////import API from '../json/fhcrm.json';
///import axios from 'axios';
///@SocketController()
export class FHMessageController{
/** 
    @OnMessage("save")
    save(@MessageBody() message: any) {
        console.log("received message: ", message);
    }
*/    
    save(message: any) {
        console.log("received message: ", message);
    }    

}