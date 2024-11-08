import { Injectable } from '@angular/core';
import { workExp } from '../interfaces/work.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetWorkExperienceService {

  private dataUrl = 'assets/data/works-experience.json'

  constructor(private http: HttpClient) { }

  getWorks(): Observable<workExp[]> {
    return this.http.get<workExp[]>(this.dataUrl);
  }
}
