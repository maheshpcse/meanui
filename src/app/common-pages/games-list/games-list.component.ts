import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'underscore';
declare var $: any;

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
})
export class GamesListComponent implements OnInit {
  public limit: any = 10;
  public rowsOnPage: any = 10;
  public page: any = 1;
  public pager: any = {};
  public totalPages: any = 0;
  public searchQuery: any = '';

  viewPage: any = 'table';
  gamesList: any = [
    {
      title: 'GTA Series',
      sub_title: [
        {
          name: 'GTA I',
          actual_size: '5 GB',
          website: 'www.thepcgames.net',
          url_download: 'https://www.thepcgames.net/gta/download',
          download_progress: 97,
          status: 1,
        },
        {
          name: 'GTA I',
          actual_size: '3.7 GB',
          website: 'www.oceanofgames.org',
          url_download: 'https://www.oceanofgames.org/gta/download',
          download_progress: 0,
          status: 0,
        },
        {
          name: 'GTA SanAndReas',
          actual_size: '8 GB',
          website: 'www.thepcgames.net',
          url_download: 'https://www.thepcgames.net/gta_sandandreas/download',
          download_progress: 0,
          status: 0,
        },
        {
          name: 'GTA SanAndReas',
          actual_size: '4.5 GB',
          website: 'www.oceanofgames.org',
          url_download: 'https://www.oceanofgames.org/gta_sandandreas/download',
          download_progress: 35,
          status: 1,
        },
        {
          name: 'GTA V',
          actual_size: '65 GB',
          website: 'www.thepcgames.net',
          url_download: 'https://www.thepcgames.net/gta5/download',
          download_progress: 86,
          status: 1,
        },
        {
          name: 'GTA V',
          actual_size: '53 GB',
          website: 'www.oceanofgames.org',
          url_download: 'https://www.oceanofgames.org/gta5/download',
          download_progress: 0,
          status: 0,
        },
      ],
      total_size: '139.2 GB',
      websites: [
        'www.thepcgames.net',
        'www.oceanofgames.org',
        'www.crackedgames.org',
      ],
      download_urls: [
        'https://www.thepcgames.net/gta5/download',
        'https://www.oceanofgames.org/gta5/download',
        'https://www.crackedgames.org/gta5/download',
      ],
      total_progress: 36,
      status: 1,
      selected: false,
    },
    {
      title: 'Forza Horizon Series',
      sub_title: [
        {
          name: 'Forza Horizon 3',
          actual_size: '35 GB',
          website: 'www.thepcgames.net',
          url_download: 'https://www.thepcgames.net/forza_horizon3/download',
          download_progress: 65,
          status: 1,
        },
        {
          name: 'Forza Horizon 3',
          actual_size: '23 GB',
          website: 'www.oceanofgames.org',
          url_download: 'https://www.oceanofgames.org/forza_horizon3/download',
          download_progress: 0,
          status: 0,
        },
        {
          name: 'Forza Horizon 4',
          actual_size: '65 GB',
          website: 'www.thepcgames.net',
          url_download: 'https://www.thepcgames.net/forza_horizon4/download',
          download_progress: 45,
          status: 1,
        },
        {
          name: 'Forza Horizon 4',
          actual_size: '55 GB',
          website: 'www.oceanofgames.org',
          url_download: 'https://www.oceanofgames.org/forza_horizon4/download',
          download_progress: 0,
          status: 0,
        },
      ],
      total_size: '178 GB',
      websites: [
        'www.thepcgames.net',
        'www.oceanofgames.org',
        'www.crackedgames.org',
      ],
      download_urls: [
        'https://www.thepcgames.net/gta5/download',
        'https://www.oceanofgames.org/gta5/download',
        'https://www.crackedgames.org/gta5/download',
      ],
      total_progress: 27,
      status: 1,
      selected: false,
    },
  ];
  viewGame: any = {};
  currentIndex: any = null;
  filterList: any = 'all';

  viewForm: any = '';
  gameName: any = null;
  sizeConfigName: any = null;
  gameSize: any = null;
  gameProgress: any = null;
  @ViewChild('singleGameForm', { static: false }) singleGameFormRef: NgForm;
  seriesGameForm: FormGroup;
  subGameName: any = null;
  @ViewChild('multipleGameForm', { static: false }) multipleGameFormRef: NgForm;
  siteUrlForm: FormGroup;
  formIndex: any = null;

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.siteUrlForm = this.formBuilder.group({
      siteUrlArr: this.formBuilder.array([this.initForm('single')]),
    });
    this.seriesGameForm = this.formBuilder.group({
      seriesGameArr: this.formBuilder.array([this.initForm('multiple')]),
    });
  }

  onSelectPageView(view: any) {
    console.log('Selected page view isss', view);
    this.viewPage = view;
    this.viewForm = '';
    this.resetForm();
  }

  onSelectItem(item: any) {
    console.log('Selected item isss', item);
    this.viewGame = item;
  }

  myFunction(id: any, index: any) {
    const tableId = id + `-${index}`;
    const x = document.getElementById(tableId);
    if (x.className.indexOf('w3-show') === -1) {
      x.className += ' w3-show';
      this.currentIndex = index;
      for (let i = 0; i < this.gamesList.length; i++) {
        if (i !== index) {
          const tableId1 = id + `-${i}`;
          const y = document.getElementById(tableId1);
          y.className = y.className.replace(' w3-show', '');
        }
      }
    } else {
      x.className = x.className.replace(' w3-show', '');
      this.currentIndex = null;
    }
  }

  onSelectFilterList(list: any) {
    console.log('Select list isss', list);
    this.filterList = list;
  }

  onSelectConfig(form: any) {
    console.log('Select form config isss', form);
    this.viewForm = form;
    this.resetForm();
  }

  initForm(form: any) {
    if (form === 'single') {
      return this.formBuilder.group({
        siteName: new FormControl(null, [Validators.required]),
        downloadUrl: new FormControl(null, [Validators.required])
      });
    } else if (form === 'multiple') {
      return this.formBuilder.group({
        subSeriesName: new FormControl(null, [Validators.required]),
        subGameSizeConfig: new FormControl(null, [Validators.required]),
        subGameSize: new FormControl(null, [Validators.required]),
        webSiteName: new FormControl(null, [Validators.required]),
        urlDownload: new FormControl(null, [Validators.required]),
        subGameProgress: new FormControl(null, [Validators.required])
      });
    }
  }

  addForm(id: any, form: any) {
    this.formIndex = id;
    if (form === 'single') {
      const control = this.siteUrlForm.controls.siteUrlArr as FormArray;
      control.push(this.initForm('single'));
    } else if (form === 'multiple') {
      const control = this.seriesGameForm.controls.seriesGameArr as FormArray;
      control.push(this.initForm('multiple'));
    }
  }

  removeForm(id: any, form: any) {
    this.formIndex = id;
    if (form === 'single') {
      const control = this.siteUrlForm.controls.siteUrlArr as FormArray;
      control.removeAt(id);
    } else if (form === 'multiple') {
      const control = this.seriesGameForm.controls.seriesGameArr as FormArray;
      control.removeAt(id);
    }
  }

  // ******* Save Single Game Form Details ******* //
  saveGameDetails(form: any) {
    let gamePayload: any = {};
    if (form === 'single') {
      gamePayload = {
        gameName: this.gameName,
        sizeConfigName: this.sizeConfigName,
        gameSize: this.gameSize,
        gameProgress: this.gameProgress,
        gameSiteUrls: this.siteUrlForm.controls.siteUrlArr.value
      };
    } else if (form === 'multiple') {
      gamePayload = {
        gameName: this.gameName,
        subGameSeries: this.seriesGameForm.controls.seriesGameArr.value
      };
    }
    console.log('Post payload to add game data', gamePayload);
  }

  resetForm() {
    if (this.singleGameFormRef) {
      this.singleGameFormRef.reset();
    }
    if (this.multipleGameFormRef) {
      this.multipleGameFormRef.reset();
    }
    if (this.siteUrlForm) {
      this.siteUrlForm.reset();
    }
    if (this.seriesGameForm) {
      this.seriesGameForm.reset();
    }
    this.viewGame = {};
    this.currentIndex = null;
    this.filterList = 'all';
    this.gameName = null;
    this.sizeConfigName = null;
    this.gameSize = null;
    this.gameProgress = null;
    this.subGameName = null;
    this.formIndex = null;
    if (this.viewForm === 'single') {
      this.initForm('single');
    } else if (this.viewForm === 'multiple') {
      this.initForm('multiple');
    }
  }
}
