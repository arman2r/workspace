import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { NavMenuComponent } from '../../components/nav-menu/nav-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DescriptionProfileNavComponent } from "../../components/description-profile-nav/description-profile-nav.component";
import { TimeLineCardComponent } from '@/app/components/time-line-card/time-line-card.component';
import { workExp } from '@/app/interfaces/work.interface';
import { GetWorkExperienceService } from '@/app/services/get-work-experience.service';
import { MatChipsModule } from '@angular/material/chips';
import { CheckHorizontalScrollDirective } from '@/app/directives/check-horizontal-scroll.directive';
import { skill } from '@/app/interfaces/skill.interface';
import { SwiperOptions } from 'swiper/types';
import { SwiperContainer } from 'swiper/element';
import { SwiperDirective } from '@/app/directives/swiper.directive';
import { TopSkillsService } from '@/app/services/top-skills.service';
import { SanitizedTopSkill, TopSkill } from '@/app/interfaces/topSkill.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DetectDominantColorDirective } from '@/app/directives/detect-dominant-color.directive';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TimeLineCardComponent,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    NavMenuComponent,
    MatGridListModule,
    NgClass,
    NgStyle,
    NgIf,
    DescriptionProfileNavComponent,
    CheckHorizontalScrollDirective,
    DetectDominantColorDirective
    //SwiperDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HomeComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild('drawerIntoGrid') drawerIntoGrid!: MatDrawer;
  private _mobileQueryListener: () => void;
  activeTile: number | null = null;
  originSizes: { [key: number]: { colspan: number; rowspan: number } } = {};
  drawerOpened = false;
  works: workExp[] = [];
  workDetail?: workExp;
  topSkills: TopSkill[] = []; 
  public htmlSanitizado: SanitizedTopSkill[] = [];

  //@ViewChild('swiper', { static: false }) swiper!: SwiperContainer;

  contents: skill[] = [
    {
      skill: 'Computer',
      description: 'Description about computer...',
      url: 'https://picsum.photos/id/1/640/480',
    },
    {
      skill: 'Building',
      description: 'Building description...',
      url: 'https://picsum.photos/id/101/640/480',
    },
    {
      skill: 'Glass over a computer',
      description: 'Description of a glass over a computer',
      url: 'https://picsum.photos/id/201/640/480',
    },
    {
      skill: 'Autumn',
      description: 'Description about autumn leaves',
      url: 'https://picsum.photos/id/301/640/480',
    },
    {
      skill: 'Balloon',
      description: 'Coloured balloon',
      url: 'https://picsum.photos/id/401/640/480',
    },
  ];

  /*index = 0;

  swiperConfig: SwiperOptions = {
    spaceBetween: 10,
    navigation: true,
  };

  swiperThumbsConfig: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  };*/

  /*ngAfterViewInit(): void {
    setTimeout(() => {
      //console.log("Attempting swiper initialization:", this.swiper);
      if (this.swiper && this.swiper.swiper) {
        //console.log("Swiper is ready:", this.swiper.nativeElement);
        this.swiper.swiper.on('init', () => {
          //console.log("Swiper initialized:", this.swiper.nativeElement);
          this.swiper.swiper.activeIndex = this.index;
          this.changeDetectorRef.detectChanges();
        });
      } else {
        console.warn("Swiper or nativeElement not available:", this.swiper);
      }
    })
  }*/

  /*slideChange(swiper: any) {
    this.index = swiper.detail[0].activeIndex;
  }*/

  constructor(
    private changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher, 
    private listWork: GetWorkExperienceService, 
    private listTopSkills: TopSkillsService,
    private sanitizer: DomSanitizer) {
    this.mobileQuery = media.matchMedia('(max-width: 1100px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();

    if (this.mobileQuery.addEventListener) {
      this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    } else {
      // Fallback for environments where addEventListener is not supported
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  }

  ngOnInit(): void {
    this.listWork.getWorks().subscribe((data: workExp[]) => {
      this.works = data;
      //console.log(data) 
    })
    
    this.listTopSkills.getTopSkills().subscribe(res => {
      this.topSkills = res;
      this.htmlSanitizado = res.map(skill => ({
        ...skill, // Mantener todas las propiedades originales
        description: this.sanitizer.bypassSecurityTrustHtml(skill.description || '') // Sanitizar solo Description
      }));
 
    })

  }

  openPanel(tileNumber: number, tile: MatGridTile): void {
    // Almacena el tamaño original solo la primera vez que se hace clic en un tile
    if (!this.originSizes[tileNumber]) {
      this.originSizes[tileNumber] = {
        colspan: tile.colspan,
        rowspan: tile.rowspan,
      };
    }

    console.log('tamaño original', this.originSizes[tileNumber].colspan, this.originSizes[tileNumber].rowspan);

    // Cambia el tile activo
    this.activeTile = this.activeTile === tileNumber ? tileNumber : tileNumber;

    console.log(this.activeTile);

    // Cambia el colspan y rowspan del tile según el estado activo
    tile.colspan = 3;
    tile.rowspan = 2;

    console.log(this.activeTile);
  }

  checkTile() {
    if (this.activeTile === null) {
      console.log('entro aqui', this.activeTile)
      this.drawerOpened = false;
      this.drawer.opened = true;
      this.drawer.open();
      console.log('entro aqui 2', this.drawerOpened)
    }
  }

  closePanel(tileNumber: number, tile: MatGridTile, event: MouseEvent): void {
    event.stopPropagation(); // Evita que el clic en el botón de cerrar active el tile

    console.log('tamaños originales', this.originSizes[tileNumber].colspan,
      this.originSizes[tileNumber].rowspan)

    // Cambia el tile activo a null
    this.activeTile = null;

    this.checkTile()

    // Verifica si originSizes tiene un tamaño original guardado
    if (this.originSizes[tileNumber]) {
      // Restablece el tamaño original
      tile.colspan = this.originSizes[tileNumber].colspan;
      tile.rowspan = this.originSizes[tileNumber].rowspan;
    }

    console.log('Tile cerrado', tileNumber);

  }

  savePanelState() {
    console.log('entro aqui');
    this.drawerOpened = false;
    this.drawer.open()
  }

  drawerToggle(stats: any) {
    this.drawer.close();
    this.drawerIntoGrid.open()
    this.workDetail = JSON.parse(stats);
    console.log('que es esto', this.workDetail)
    this.changeDetectorRef.detectChanges()
  }

  togglePanels() {
    this.checkTile()
  }

  ngOnDestroy(): void {
    if (this.mobileQuery.removeEventListener) {
      this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    } else {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }
  }

}
