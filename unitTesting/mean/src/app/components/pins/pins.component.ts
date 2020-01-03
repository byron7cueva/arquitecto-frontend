import { Component, ViewEncapsulation } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';
import { MatSnackBar } from '@angular/material';
import { PinsService } from './pins.service';
import { filter } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PinsComponent {
  public step = 0;
  public pins = [];
  private currentSubscription: Subscription;

  constructor(
    private repository: RepositoryService,
    private snackBar: MatSnackBar,
    private pinsService: PinsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.repository.getPins().subscribe(pins => {
      this.pins = pins.map(pin => {
        const controls = {};

        pin.assets.forEach(asset => {
          controls[asset._id] = this.formBuilder.control(asset.readed);
        });

        return {
          ...pin,
          formGroup: this.formBuilder.group(controls)
        };
      });
    });

    this.pinsService.$actionObserver.pipe(filter(action => action === 'save')).subscribe(action => {
      this.updateProgress(this.step);
    });
  }

  public setStep(index: number) {
    this.step = index;
    this.updatePercentage(index);
  }

  public nextStep() {
    this.step++;
  }

  public prevStep() {
    this.step--;
  }

  public updateProgress(index) {
    const pin = this.pins[index];

    this.repository
      .updatePin(pin._id, {
        title: pin.title,
        author: pin.author,
        description: pin.description,
        percentage: pin.percentage,
        tags: pin.tags,
        assets: pin.assets
      })
      .subscribe(pin => {
        this.snackBar.open('Progress updated!', 'OK', {
          duration: 2000
        });
      });
  }

  public openUrl(URL: string): void {
    window.open(URL, '_blank');
  }

  private updatePercentage(index) {
    if (this.currentSubscription && !this.currentSubscription.closed) {
      this.currentSubscription.unsubscribe();
    }

    this.currentSubscription = this.pins[index].formGroup.valueChanges.subscribe(values => {
      const keys = Object.keys(values);
      const total = keys.length;
      const active = keys.map(key => values[key]).filter(value => value);
      const percentage = ((active.length * 100) / total).toFixed(2);

      this.pins[index].percentage = percentage;
      this.pins[index].assets = this.pins[index].assets.map(asset => {
        return {
          ...asset,
          readed: values[asset._id]
        };
      });
    });
  }
}
