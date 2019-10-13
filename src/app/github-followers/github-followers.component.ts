import {Component, OnInit} from '@angular/core';
import {GithubFollowersService} from '../service/github-followers.service';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
import {PartialObserver, pipe} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {timer, combineLatest} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {

  followers: any;

  constructor(
    private  route: ActivatedRoute,
    private service: GithubFollowersService) {
  }

  ngOnInit() {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
      .pipe(switchMap(value => {
        let id = value[0].get('id');
        let page = value[1].get('page');
        // this.service.getAll({id:id,page:page});
        return this.service.getAll();
      }))
      .subscribe(value => this.followers = value);


    // this.route.paramMap.subscribe();
    // // let id = this.route.snapshot.paramMap.get('id');
    //
    // this.route.queryParamMap.subscribe();
    // // let page = this.route.snapshot.queryParamMap.get('page');
    //
    //
    // this.service.getAll()
    //   .subscribe(value => {
    //     this.followers = value;
    //     console.log(this.followers);
    //   });
  }

}
