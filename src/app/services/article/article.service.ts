import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import StringifyObject from 'stringify-object';

import { singleLineString } from 'src/app/utilities/helpers';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ArticleService {
	constructor(private http: HttpClient, @Inject('skipLoading') @Optional() private skipLoading: string) { }

	getOneByUrlName(urlName: string): Observable<any> {
		const query = singleLineString`
			query {
				articleByUrlName(urlName: "${urlName}") {
					Id,
					title,
					shortSummary,
					author,
					postedAt,
					reviewedBy,
					content,
					headerImg,
					urlName,
					url
				}
			}
		`;

		return this.http.get(`${environment.apiUrl}/graphql?query=${query}`).pipe(
			map((res: any) => res.data.articleByUrlName)
		);
	}

	getAll(fields= {}, offset: number = 0, limit: number = 10): Observable<any> {
		const args = StringifyObject(fields, { singleQuotes: false });
		const query = singleLineString`
			query {
				allArticle(fields: ${args}, offset: ${offset}, limit: ${limit}) {
          offset,
          limit,
          maxPage,
          articles {
            Id,
            title,
            author,
            postedAt,
            headerImg,
            urlName,
            url
          }
				}
			}
		`;

		return this.http.get(`${environment.apiUrl}/graphql?query=${query}`, {
      ...this.skipLoading && {
        headers: { skipLoading: this.skipLoading }
      }
    }).pipe(
			map((res: any) => res.data.allArticle)
		);
	}
}
