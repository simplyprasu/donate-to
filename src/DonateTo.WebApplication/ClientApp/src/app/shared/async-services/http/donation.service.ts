import { BaseHttpClientService } from './base-http-client.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/app-config.service';
import { Observable } from 'rxjs';
import { DonationModel } from '../../models/donation.model';

@Injectable({
  providedIn: 'root',
})
export class DonationService extends BaseHttpClientService<DonationModel> {
  constructor(httpClient: HttpClient, configService: ConfigService) {
    const baseUrl = configService.get('baseUrl');
    super(httpClient, baseUrl, 'api/v1/donation');
  }

  createDonation(donation: DonationModel): Observable<DonationModel> {
    return this.create(donation);
  }
}
