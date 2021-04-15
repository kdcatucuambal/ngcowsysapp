import { Cow } from "src/app/models/cow.interface";
import { Observation } from "src/app/models/observation.interface";
import { Payment } from "src/app/models/payment.interface";
import { UserRegister } from "src/app/models/user.interface";

export class UtilCow {
    static checkPasswords = (passCreated: string, passConfirm: string): boolean => {
        return passCreated == passConfirm;
    }

    static isCompleteUserRegister = (user: UserRegister): boolean => {
        if (user.name == '' ||
            user.password == '' ||
            user.cofirmPassword == '' ||
            user.email == '' ||
            user.lastname == '' ||
            user.password != user.cofirmPassword) {
            return false;
        }
        return true;
    }

    static isCompleteCow = (cow: Cow): boolean => {
        if (cow.cowName == '' ||
            cow.cowPrice == '' ||
            cow.cowRace == '' ||
            cow.cowBirthDate == '' ||
            cow.cowBuyDate == '') {
            return false;
        }

        return true;
    }

    static isCompleteObs = (obs: Observation): boolean => {
        if (obs.cow.cowName == ''
            || obs.observationDate == ''
            || obs.observationPrice == ''
            || obs.type.typeName == '') {
            return false;
        }
        return true;
    }

    static getFormattedDate = (date: Date): string => {
        const day = date.getDate();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return year + '-' + (month < 10 ? ("0" + month) : month) + '-' + (day < 10 ? ("0" + day) : day);
    }

    static isFromDateSmallest = (from: Date, to: Date): boolean => {
        return from.getTime() < to.getTime();
    }

    static isCompletePay = (pay: Payment): boolean => {
        if (pay.paymentDate == '' ||
            pay.paymentFromDate == '' ||
            pay.paymentToDate == '' ||
            pay.paymentLiterValue.toString() == '') {
            return false;
        }
        return true;
    }

 

}