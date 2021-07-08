import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { Emoticon } from 'src/app/models/mood.model';

@Component({
  selector: 'select-emoticon',
  templateUrl: './select-emoticon.component.html',
  styleUrls: ['./select-emoticon.component.scss'],
})
export class SelectEmoticonComponent implements OnInit {
  @Input() selectedEmoticon: Emoticon;
  @Output() selectEmoticonEvent= new EventEmitter<any>();
  @ViewChild('selectEmoticon', { static: true }) template;

  public emoticons: Emoticon[]= [
    {
      name: 'gembira',
      value: 5,
      icon: 'icons/svg/emoticons/happy.svg'
    },
    {
      name: 'senang',
      value: 4,
      icon: 'icons/svg/emoticons/smile.svg'
    },
    {
      name: 'netral',
      value: 3,
      icon: 'icons/svg/emoticons/neutral.svg'
    },
    {
      name: 'sedih',
      value: 2,
      icon: 'icons/svg/emoticons/sad.svg'
    },
    {
      name: 'buruk',
      value: 1,
      icon: 'icons/svg/emoticons/awful.svg'
    },
  ];

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }

  onSelect(emoticon: Emoticon) {
    this.selectEmoticonEvent.emit(emoticon);
  }
}
