import { ColumnItem, DonationRequestModel } from '../../shared/models';
import { Component, OnInit } from '@angular/core';

import { DonationsSandbox } from './donations-sandbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donations-admin',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css'],
})
export class DonationsComponent implements OnInit {
  constructor(public donationSandBox: DonationsSandbox, protected router: Router) {}

  donationRequests: DonationRequestModel[] = [];
  listOfColumns: ColumnItem[] = [
    {
      name: 'Item',
    },
    {
      name: 'Finish Date',
    },
    {
      name: 'Observation',
    },
    {
      name: 'Admin.Action',
    },
  ];

  ngOnInit(): void {
    this.donationSandBox.donationRequests$.subscribe((donations) => {
      this.donationRequests = donations;
    });

    this.donationSandBox.loadDonationRequests();
  }

  DeleteDonationRequest(donationRequest: DonationRequestModel) {
    this.donationSandBox.deleteDonationRequest(donationRequest);
    this.donationRequests = this.donationRequests.filter((item) => item !== donationRequest);
  }
}