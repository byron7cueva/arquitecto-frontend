import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RepositoryService } from 'src/app/services/repository.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  assets: FormArray;

  constructor(
    private _formBuilder: FormBuilder,
    private repository: RepositoryService,
    private navigate: NavigationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      firstAsset: ['', Validators.required],
      assets: this._formBuilder.array([])
    });
  }

  public createAsset() {
    return this._formBuilder.group({
      url: ''
    });
  }

  public addAsset() {
    this.assets = this.secondFormGroup.get('assets') as FormArray;
    this.assets.push(this.createAsset());
  }

  public deleteAsset(id) {
    this.assets = this.secondFormGroup.get('assets') as FormArray;
    this.assets.removeAt(id);
  }

  public savePin() {
    const asset = this.secondFormGroup.get('firstAsset').value;
    const asset2 = this.secondFormGroup.get('assets').value;

    const model = {
      ...this.firstFormGroup.value,
      assets: [{ url: asset }, ...asset2]
    };

    this.repository.savePins(model).subscribe(response => {
      this.snackBar
        .open('Your pin is saved, Redirecting ...', 'Cool!', {
          duration: 2000
        })
        .afterDismissed()
        .subscribe(() => {
          this.navigate.goToPins();
        });
    });
  }
}
