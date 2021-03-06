import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DonationItemModel } from 'src/app/shared/models/donation-item.model';
import { DonationSandbox } from 'src/app/donation/donation.sandbox';
import { AvailabilityModel } from 'src/app/shared/models/availability.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { WeekDays } from 'src/app/shared/enum/weekdays';

@Component({
  selector: 'app-donation-step-finish',
  templateUrl: './donation-step-finish.component.html',
  styleUrls: ['./donation-step-finish.component.css'],
})
export class DonationStepFinishComponent implements OnInit, OnDestroy {
  @Input() donationItems: DonationItemModel[];
  @Output() isFormValid = new EventEmitter<boolean>();

  observation: string;

  subscriptions: Subscription[] = [];

  availabilities: AvailabilityModel[] = [];

  weekDays = [
    { dayOfWeek: WeekDays.Monday, description: this.translateService.instant('WeekDays.Monday') },
    { dayOfWeek: WeekDays.Tuesday, description: this.translateService.instant('WeekDays.Tuesday') },
    { dayOfWeek: WeekDays.Wednesday, description: this.translateService.instant('WeekDays.Wednesday') },
    { dayOfWeek: WeekDays.Thursday, description: this.translateService.instant('WeekDays.Thursday') },
    { dayOfWeek: WeekDays.Friday, description: this.translateService.instant('WeekDays.Friday') },
  ];

  finishStepFormGroup = new FormGroup({
    weekDayFormControl: new FormControl('', Validators.required),
    startTimeFormControl: new FormControl(null, Validators.required),
    finishTimeFormControl: new FormControl(null, Validators.required),
  });

  constructor(public donationSandbox: DonationSandbox, public translateService: TranslateService) {}
  ngOnInit(): void {
    this.registerEvents();
  }

  dayOfWeekDescription(dayOfWeek: number): string {
    return this.weekDays.find((weekDay) => weekDay.dayOfWeek === dayOfWeek).description;
  }

  addAvailabilityToList(): void {
    this.validateFormGroup(this.finishStepFormGroup);
    if (this.finishStepFormGroup.valid) {
      const availability: AvailabilityModel = new AvailabilityModel();
      availability.dayOfWeek = this.finishStepFormGroup.controls.weekDayFormControl.value;
      availability.startTime = this.finishStepFormGroup.controls.startTimeFormControl.value;
      availability.endTime = this.finishStepFormGroup.controls.finishTimeFormControl.value;
      this.availabilities = [...this.availabilities, availability];
      this.finishStepFormGroup.reset();
      this.isFormValid.emit(true);
    }
  }

  removeAvailability(availability: AvailabilityModel): void {
    this.availabilities = this.availabilities.filter((item) => item !== availability);
  }

  validateFormGroup(formGroup: FormGroup) {
    for (const i in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(i)) {
        formGroup.controls[i].markAsDirty();
        formGroup.controls[i].updateValueAndValidity();
      }
    }
  }

  isValidForm(): boolean {
    return this.finishStepFormGroup.valid;
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  /**
   * Unsubscribes from events
   */
  unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Subscribes to events
   */
  registerEvents(): void {
    this.subscriptions.push(this.finishStepFormGroup.valueChanges.subscribe(() => this.isFormValid.emit(true)));

    this.subscriptions.push();
  }
}
