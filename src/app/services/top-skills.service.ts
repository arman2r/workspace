import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopSkill } from '../interfaces/topSkill.interface';

@Injectable({
  providedIn: 'root'
})
export class TopSkillsService {

  private dataUrl = 'assets/data/top-skills.json'

  constructor(private http: HttpClient) { }

  getTopSkills(): Observable<TopSkill[]> {
    return this.http.get<TopSkill[]>(this.dataUrl);
  }
}
