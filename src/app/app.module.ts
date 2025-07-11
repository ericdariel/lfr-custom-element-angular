/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import {Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';

@NgModule({
	imports: [BrowserModule],
	providers: [],
})
export class AppModule {
	constructor(private injector: Injector) {}

	ngDoBootstrap() {
		const AppComponentElement = createCustomElement(AppComponent, {
			injector: this.injector,
		});

		customElements.define(
			'liferay-sample-custom-element-with-importmap',
			AppComponentElement
		);
	}
}
