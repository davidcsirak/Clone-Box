import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Order } from '../../model/order.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {}

  SendOrderEmail(order: Order) {
    return emailjs.send(
      environment.EMAIL_JS_SERVICE_ID,
      environment.EMAIL_JS_TEMPLATE_ID,
      {
        from_name: 'Clone Box',
        reply_to: 'clonebox@gmail.com',
        companyName: order.companyName,
        contactPerson: order.contactPerson,
        phone: order.phone,
        email: order.email,
        address: order.address,
        price: order.calcResult.price,
        quantity: order.calcResult.quantity,
        materialArea: order.calcResult.materialArea,
        boxArea: order.calcResult.boxArea,
        boxVolume: order.calcResult.boxVolume,
      },
      environment.EMAIL_JS_PUBLIC_KEY
    );
  }
}
