import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';

import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.scss'],
})
export class ArticleListItemComponent implements OnInit {
  @Input() article: Article;
  @ViewChild('articleTemplate', { static: true }) template;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.template);
  }
}
