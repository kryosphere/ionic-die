import { OnInit, Component, signal, effect } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { Motion } from '@capacitor/motion';
import { IonCard, IonCardContent } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCardContent, IonCard, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {

  accel: any = signal(
    {
      x: 0,
      y: 0,
      z: 0,
    }
  );

  val: any = signal(1);

  async getAccel() {
    const thisacc = await Motion.addListener(
      'accel',
      (e) => {
        this.accel.set(e.accelerationIncludingGravity);
      }
    )
  }

  ngOnInit(): void {
    this.getAccel();
  }

  constructor() {
    effect(() => {
      if (this.accel().x > 10 || this.accel().y > 10 || this.accel().z > 10) {
        this.val.set(Math.floor(Math.random() * 6) + 1);
      }
    },
    {
      allowSignalWrites: true
    })
  }
}
