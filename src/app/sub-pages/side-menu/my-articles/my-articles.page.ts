import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { Article } from 'src/app/models/article.model';
import { UserArticlesService } from 'src/app/services/user-articles/user-articles.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.page.html',
  styleUrls: ['./my-articles.page.scss'],
})
export class MyArticlesPage implements OnInit {
  public articles: Article[]= [];
  public finishLoad: boolean= false;
  private getArchivedArticlesListener: Subscription= null;
  private removeArchivedArticlesListener: Subscription= null;

  constructor(private alertController: AlertController, private userArticles: UserArticlesService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.getArchivedArticlesListener === null) {
      this.getArchivedArticlesListener= this.userArticles.getArchivedArticles().subscribe(res => {
        this.articles= res.articles;
        this.finishLoad= true;
      });
    }
  }

  ionViewWillLeave() {
    this.getArchivedArticlesListener && this.getArchivedArticlesListener.unsubscribe();
    this.removeArchivedArticlesListener && this.removeArchivedArticlesListener.unsubscribe();
  }

  pullRefresh(event) {
    this.finishLoad= false;

    this.getArchivedArticlesListener= this.userArticles.getArchivedArticles().subscribe(res => {
      this.articles= res.articles;
      this.finishLoad= true;

      event && event.target.complete();
    });
  }

  async onRemove(article_id: number) {
    const alert= await this.alertController.create({
      message: 'Apakah anda yakin ingin menghapus artikel ini?',
      buttons: [
        {
          text: 'Tetap simpan',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            this.removeArchivedArticlesListener= this.userArticles.removeArchivedArticles([article_id]).subscribe(res => {
              this.articles= this.articles.filter((article: Article) => article.Id !== article_id);
            });
          }
        }
      ]
    });
    
    alert.present();
  }
}
